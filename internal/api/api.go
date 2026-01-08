/**
* This package provides an HTTP API server using the Fiber framework.
* It allows registration of modular Route implementations that define
* specific domain endpoints and background processing.
*
* The API server includes common middleware such as logging and CORS,
* and supports graceful shutdown on system signals.
**/

package api

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// API is the HTTP surface for the daemon. It holds the Fiber app and
// registered Route implementations. Use `RegisterRoute` to attach
// domain routes, then call `Start` to run the HTTP server.
type API struct {
	app    *fiber.App
	routes map[string]Route
}

// NewAPI creates a configured Fiber app with common middleware
// suitable for local development and Angular integration.
// By default it enables a logger and CORS (origins from CORS_ORIGINS env or http://localhost:4200).
func NewAPI() *API {
	origins := os.Getenv("CORS_ORIGINS")
	if origins == "" {
		origins = "http://localhost:4200"
	}

	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowCredentials: true,
	}))

	return &API{app: app, routes: make(map[string]Route)}
}

// Start initializes routes, starts any registered Route background
// workers, and runs the HTTP server. It blocks until the process
// receives SIGINT/SIGTERM or the server returns an error.
func (api *API) Start(address string) error {
	api.initializeRoutes()

	// start background parts of routes (if any) without blocking the main listener
	for _, r := range api.routes {
		route := r
		go func() {
			if err := route.Start(); err != nil {
				log.Printf("route.Start error: %v", err)
			}
		}()
	}

	// Run the listener in a goroutine so we can handle signals and perform a graceful shutdown.
	errc := make(chan error, 1)
	go func() {
		if err := api.app.Listen(address); err != nil {
			errc <- err
		}
	}()

	// Wait for either OS signal or listener error
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)

	select {
	case s := <-sig:
		log.Printf("received signal %v, shutting down HTTP server", s)
		// attempt graceful shutdown with timeout
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = api.app.Shutdown()
		select {
		case <-ctx.Done():
			return nil
		case err := <-errc:
			return err
		}
	case err := <-errc:
		return err
	}
}

// Stop performs an immediate shutdown of the Fiber app.
func (api *API) Stop() error {
	return api.app.Shutdown()
}

// GetApp exposes the underlying Fiber app for advanced wiring/tests.
func (api *API) GetApp() *fiber.App {
	return api.app
}

// initializeRoutes wires built-in routes and ensures registered
// Route implementations are attached to the Fiber app.
func (api *API) initializeRoutes() {
	api.app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	// Registered routes are expected to implement RegisterRoutes(api *API)
	// which should attach their HTTP handlers to `api.app`.
	for _, r := range api.routes {
		r.RegisterRoutes(api)
	}
}

// RegisterRoute attaches a Route to the API. The Route should register
// its HTTP handlers in RegisterRoutes and may start background workers
// when Start is called on the route.
func (api *API) RegisterRoute(route Route, routeName string) {
	route.RegisterRoutes(api)
	if routeName != "" {
		route.SetName(routeName)
	}

	api.routes[routeName] = route
}

func (api *API) GetRoute(name string) Route {
	return api.routes[name]
}

/*
Example usage (in `cmd/daemontaskboot/main.go`):

	a := api.NewAPI()
	a.RegisterRoute(myRouteImplementation)
	if err := a.Start(":8080"); err != nil {
		log.Fatalf("API failed: %v", err)
	}

Notes:
 - CORS defaults to http://localhost:4200 to simplify local Angular dev.
 - Route implementations should attach handlers using `api.GetApp()`.
 - Route.Start is invoked in background; it may be used to pump background tasks.
*/
