package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/Akif-jpg/daemontaskboot/internal/api"
	"github.com/Akif-jpg/daemontaskboot/internal/api/routes"
)

var (
	version = "dev"
	commit  = "none"
	date    = "unknown"
)

func main() {
	log.Printf("daemontaskboot %s (%s) %s\n", version, commit, date)

	// Read and display logo from file
	logoPath := filepath.Join("logos", "logo.txt")
	logoContent, err := os.ReadFile(logoPath)
	if err != nil {
		log.Printf("Warning: Could not read logo file: %v\n", err)
	} else {
		log.Println(string(logoContent))
	}

	// Initialize and start API server
	log.Println("Starting API server...")
	apiServer := api.NewAPI()

	// Register all routes
	apiServer.RegisterRoute(routes.NewTasksRoute(), "tasks")
	apiServer.RegisterRoute(routes.NewSchedulesRoute(), "schedules")
	apiServer.RegisterRoute(routes.NewWatchersRoute(), "watchers")
	apiServer.RegisterRoute(routes.NewRunsRoute(), "runs")
	apiServer.RegisterRoute(routes.NewSystemRoute(), "system")

	address := ":8080"
	if port := os.Getenv("PORT"); port != "" {
		address = ":" + port
	}

	log.Printf("API server listening on %s\n", address)
	if err := apiServer.Start(address); err != nil {
		log.Fatalf("Failed to start API server: %v", err)
	}
}
