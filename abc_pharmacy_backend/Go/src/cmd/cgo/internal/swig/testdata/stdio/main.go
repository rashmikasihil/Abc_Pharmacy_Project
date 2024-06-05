// Copyright 2017 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file is here just to cause problems.
// main.swig turns into a file also named main.go.
// Make sure cmd/go keeps them separate
// when both are passed to cgo.

package main

import (
    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
    "net/http"
)

var db *sqlx.DB

func main() {
    var err error
    db, err = sqlx.Connect("postgres", "user=abc_pharmacy dbname=abc_pharmacy sslmode=disable")
    if err != nil {
        panic(err)
    }

    router := gin.Default()

    router.POST("/items", addItem)
    router.PUT("/items/:id", editItem)
    router.DELETE("/items/:id", deleteItem)
    router.POST("/invoices", createInvoice)

    router.Run(":8080")
}

type Item struct {
    ID          int     `json:"id" db:"id"`
    Name        string  `json:"name" db:"name"`
    UnitPrice   float64 `json:"unit_price" db:"unit_price"`
    ItemCategory string `json:"item_category" db:"item_category"`
}

type Invoice struct {
    ID          int    `json:"id" db:"id"`
    Name        string `json:"name" db:"name"`
    MobileNo    string `json:"mobile_no" db:"mobile_no"`
    Email       string `json:"email" db:"email"`
    Address     string `json:"address" db:"address"`
    BillingType string `json:"billing_type" db:"billing_type"`
}

func addItem(c *gin.Context) {
    var item Item
    if err := c.BindJSON(&item); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := db.NamedExec(`INSERT INTO items (name, unit_price, item_category) VALUES (:name, :unit_price, :item_category)`, &item)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Item added"})
}

func editItem(c *gin.Context) {
    id := c.Param("id")
    var item Item
    if err := c.BindJSON(&item); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := db.NamedExec(`UPDATE items SET name=:name, unit_price=:unit_price, item_category=:item_category WHERE id=`+id, &item)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Item updated"})
}

func deleteItem(c *gin.Context) {
    id := c.Param("id")

    _, err := db.Exec(`DELETE FROM items WHERE id=$1`, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
}

func createInvoice(c *gin.Context) {
    var invoice Invoice
    if err := c.BindJSON(&invoice); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := db.NamedExec(`INSERT INTO invoices (name, mobile_no, email, address, billing_type) VALUES (:name, :mobile_no, :email, :address, :billing_type)`, &invoice)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Invoice created"})
}
