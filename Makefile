SHELL := /usr/bin/env bash

APP_NAME := daemontaskboot
BIN_DIR  := bin
GO       ?= go

# Go cmd path
CMD_DAEMON := ./cmd/daemontaskboot
DAEMON_BIN := $(BIN_DIR)/$(APP_NAME)

# UI
UI_DIR := web/daemontaskboot-ui
NPM    ?= npm

# Build metadata (opsiyonel, main package içinde version/commit/date değişkenleri varsa işe yarar)
VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo dev)
COMMIT  ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo none)
DATE    ?= $(shell date -u +%Y-%m-%dT%H:%M:%SZ)

# Eğer main.go içinde şu değişkenler varsa:
# var version, commit, date string
LDFLAGS := -s -w \
	-X 'main.version=$(VERSION)' \
	-X 'main.commit=$(COMMIT)' \
	-X 'main.date=$(DATE)'

.PHONY: help \
	fmt vet test tidy \
	build build-daemon run \
	ui-install ui-run ui-build ui-test \
	install uninstall clean clean-ui clean-go

help:
	@echo "Targets:"
	@echo "  make build          - Build Go daemon"
	@echo "  make run            - Run Go daemon"
	@echo "  make test           - Go tests"
	@echo "  make tidy           - go mod tidy"
	@echo "  make ui-install     - npm install in Angular UI"
	@echo "  make ui-run         - npm start (Angular dev server)"
	@echo "  make ui-build       - npm run build"
	@echo "  make clean          - Clean Go + UI artifacts"

# --------------------
# Go targets
# --------------------
$(BIN_DIR):
	mkdir -p $(BIN_DIR)

fmt:
	$(GO) fmt ./...

vet:
	$(GO) vet ./...

test:
	$(GO) test ./... -race

tidy:
	$(GO) mod tidy

build: build-daemon

build-daemon: $(BIN_DIR)
	$(GO) build -ldflags "$(LDFLAGS)" -o $(DAEMON_BIN) $(CMD_DAEMON)

run: build-daemon
	$(DAEMON_BIN)

install: build-daemon
	sudo install -m 0755 $(DAEMON_BIN) /usr/local/bin/$(APP_NAME)

uninstall:
	sudo rm -f /usr/local/bin/$(APP_NAME)

clean-go:
	rm -rf $(BIN_DIR)

# --------------------
# UI (Angular) targets
# --------------------
ui-install:
	cd $(UI_DIR) && $(NPM) install

ui-run:
	cd $(UI_DIR) && $(NPM) run start

ui-build:
	cd $(UI_DIR) && $(NPM) run build

ui-test:
	cd $(UI_DIR) && $(NPM) run test

clean-ui:
	rm -rf $(UI_DIR)/node_modules $(UI_DIR)/dist $(UI_DIR)/.angular

# --------------------
# Combined clean
# --------------------
clean: clean-go clean-ui
