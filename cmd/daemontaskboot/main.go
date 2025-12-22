package main

import "log"

var (
	version = "dev"
	commit  = "none"
	date    = "unknown"
)

func main() {
	log.Printf("daemontaskboot %s (%s) %s", version, commit, date)
	log.Println("ok")
}
