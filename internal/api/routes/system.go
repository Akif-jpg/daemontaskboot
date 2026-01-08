package routes

import (
	"github.com/Akif-jpg/daemontaskboot/internal/api"
	"github.com/gofiber/fiber/v2"
)

// SystemRoute handles system metrics and status endpoints
// Provides real-time system information (CPU, RAM, disk, temperature, etc.)
type SystemRoute struct {
	name string
}

// GetName implements [api.Route].
func (sr *SystemRoute) GetName() string {
	return sr.name
}

// SetName implements [api.Route].
func (sr *SystemRoute) SetName(name string) {
	sr.name = name
}

// NewSystemRoute creates a new system route handler
func NewSystemRoute() *SystemRoute {
	return &SystemRoute{name: "system"}
}

// RegisterRoutes registers all system-related HTTP endpoints
func (sr *SystemRoute) RegisterRoutes(a *api.API) {
	app := a.GetApp()

	system := app.Group("/api/system")

	// System information
	system.Get("/info", sr.getSystemInfo)        // GET /api/system/info - System info (OS, hostname, uptime)
	system.Get("/metrics", sr.getCurrentMetrics) // GET /api/system/metrics - Current system metrics

	// Specific metrics
	system.Get("/cpu", sr.getCPUMetrics)          // GET /api/system/cpu - CPU usage and info
	system.Get("/memory", sr.getMemoryMetrics)    // GET /api/system/memory - RAM usage
	system.Get("/disk", sr.getDiskMetrics)        // GET /api/system/disk - Disk usage
	system.Get("/temperature", sr.getTemperature) // GET /api/system/temperature - System temperature
	system.Get("/network", sr.getNetworkMetrics)  // GET /api/system/network - Network stats

	// Process information
	system.Get("/processes", sr.listProcesses)       // GET /api/system/processes - Running processes
	system.Get("/processes/top", sr.getTopProcesses) // GET /api/system/processes/top - Top CPU/Memory processes

	// Systemd integration (Linux-specific)
	system.Get("/systemd/units", sr.listSystemdUnits)     // GET /api/system/systemd/units - List systemd units
	system.Get("/systemd/units/:name", sr.getSystemdUnit) // GET /api/system/systemd/units/:name - Get unit status
}

// Start initializes any background workers for system monitoring
func (sr *SystemRoute) Start() error {
	// TODO: Initialize metrics collection background worker if needed
	return nil
}

// Handler implementations (TODO: implement business logic)

func (sr *SystemRoute) getSystemInfo(c *fiber.Ctx) error {
	// TODO: Return OS, hostname, kernel version, uptime
	return c.JSON(fiber.Map{
		"os":       "linux",
		"hostname": "unknown",
		"kernel":   "unknown",
		"uptime":   0,
		"message":  "System info not implemented yet",
	})
}

func (sr *SystemRoute) getCurrentMetrics(c *fiber.Ctx) error {
	// TODO: Return current CPU, RAM, disk usage snapshot
	return c.JSON(fiber.Map{
		"cpu_percent":    0.0,
		"memory_percent": 0.0,
		"disk_percent":   0.0,
		"message":        "Current metrics not implemented yet",
	})
}

func (sr *SystemRoute) getCPUMetrics(c *fiber.Ctx) error {
	// TODO: Return CPU usage, cores, load average
	return c.JSON(fiber.Map{
		"usage_percent": 0.0,
		"cores":         0,
		"load_avg":      []float64{0, 0, 0},
		"message":       "CPU metrics not implemented yet",
	})
}

func (sr *SystemRoute) getMemoryMetrics(c *fiber.Ctx) error {
	// TODO: Return RAM usage (total, used, free, available)
	return c.JSON(fiber.Map{
		"total_mb":     0,
		"used_mb":      0,
		"free_mb":      0,
		"available_mb": 0,
		"percent":      0.0,
		"message":      "Memory metrics not implemented yet",
	})
}

func (sr *SystemRoute) getDiskMetrics(c *fiber.Ctx) error {
	// TODO: Return disk usage for all mounted filesystems
	return c.JSON(fiber.Map{
		"filesystems": []interface{}{},
		"message":     "Disk metrics not implemented yet",
	})
}

func (sr *SystemRoute) getTemperature(c *fiber.Ctx) error {
	// TODO: Return system temperature sensors (CPU, GPU if available)
	return c.JSON(fiber.Map{
		"sensors": []interface{}{},
		"message": "Temperature not implemented yet",
	})
}

func (sr *SystemRoute) getNetworkMetrics(c *fiber.Ctx) error {
	// TODO: Return network interface statistics (bytes sent/received)
	return c.JSON(fiber.Map{
		"interfaces": []interface{}{},
		"message":    "Network metrics not implemented yet",
	})
}

func (sr *SystemRoute) listProcesses(c *fiber.Ctx) error {
	// TODO: Return list of running processes with PID, name, CPU, memory
	return c.JSON(fiber.Map{
		"processes": []interface{}{},
		"total":     0,
		"message":   "Process list not implemented yet",
	})
}

func (sr *SystemRoute) getTopProcesses(c *fiber.Ctx) error {
	// TODO: Return top N processes by CPU and memory usage
	return c.JSON(fiber.Map{
		"top_cpu":    []interface{}{},
		"top_memory": []interface{}{},
		"message":    "Top processes not implemented yet",
	})
}

func (sr *SystemRoute) listSystemdUnits(c *fiber.Ctx) error {
	// TODO: Return list of systemd units (services, timers, etc.)
	return c.JSON(fiber.Map{
		"units":   []interface{}{},
		"total":   0,
		"message": "Systemd units not implemented yet",
	})
}

func (sr *SystemRoute) getSystemdUnit(c *fiber.Ctx) error {
	// TODO: Return specific systemd unit status
	name := c.Params("name")
	return c.JSON(fiber.Map{
		"name":    name,
		"status":  "unknown",
		"message": "Systemd unit status not implemented yet",
	})
}
