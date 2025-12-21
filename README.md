# daemontaskboot
<div align="center">

<!-- TODO: replace with a real logo -->
<h1>daemontaskboot</h1>

<p>
  <b>Linux-first task scheduler + event-driven automation + system monitoring</b><br/>
  Run commands on schedules and in response to system events (RAM/CPU/temp/logs/systemd/process), with history & logs.
</p>

<p>
  <a href="https://github.com/Akif-jpg/daemontaskboot">
    <img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Akif--jpg%2Fdaemontaskboot-181717?logo=github&logoColor=white">
  </a>
  <img alt="Platform" src="https://img.shields.io/badge/platform-Linux-blue">
  <img alt="Go" src="https://img.shields.io/badge/Go-1.24+-00ADD8?logo=go&logoColor=white">
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-embedded-003B57?logo=sqlite&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-WIP-orange">
</p>

</div>

---

## Why?

Most automation stacks are either:
- cron + a pile of scripts (hard to observe, no history, no structured logs), or
- heavy monitoring suites (too big for small personal servers).

**daemontaskboot** aims to be a *single, small* daemon that can:
- schedule tasks (interval/cron/at),
- watch your system and react to events (metrics/logs/process/systemd),
- execute actions safely (policy-based),
- keep a durable history (SQLite),
- ship as Linux packages (Debian package, Flatpak).

---

## What it will do (examples)

<!-- These are product-level examples; not all are implemented yet -->
- Every 5 minutes: open a URL (demo), run a curl healthcheck, rotate a log.
- If RAM usage exceeds a threshold: run a cleanup action / restart a worker.
- If the system overheats: detect top CPU process and stop it (policy-limited).
- Watch a log file: when a regex matches, trigger a command.
- Watch systemd: if a unit fails, restart it and send an alert.
- Watch a process: when PID exits unexpectedly, alert and/or restart it.

---

## Project status

This repository is under active development (WIP).
Expect breaking changes until `v1.0.0`.

---

## Key design goals

- **Linux-first**: systemd integration, sensible filesystem locations.
- **Embedded storage**: SQLite (no DB server required).
- **Auditable execution**: command runs are recorded (time, duration, exit code, logs).
- **Event-driven**: not just timers; watchers produce events.
- **Packaging-ready**: clean layout for deb/flatpak.

---

## Tech stack (current direction)

- Go `>= 1.24`
- SQLite
- GORM (data access)
- golang-migrate (versioned SQL migrations)

---

## Repository layout (planned)

<!-- Keep this section small; expand later into docs/ARCHITECTURE.md -->
```text
cmd/daemontaskboot/           # main entrypoint
internal/
  db/
    migrations/               # *.up.sql / *.down.sql
  scheduler/                  # time-based triggers
  watchers/                   # event sources (metrics/log/systemd/process)
  runner/                     # executes actions, captures output, stores runs
  rules/                      # rule evaluation (event -> conditions -> actions)
docs/                         # extended docs (architecture, security, roadmap)
