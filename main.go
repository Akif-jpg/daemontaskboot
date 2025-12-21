package main

import (
    "database/sql"
    "log"

    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "file:daemontaskboot.db?_foreign_keys=on")
    if err != nil { log.Fatal(err) }
    defer db.Close()

    _, err = db.Exec(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );`)
    if err != nil { log.Fatal(err) }

    log.Println("ok")
}
