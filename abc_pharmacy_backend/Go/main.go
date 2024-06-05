package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var db *sqlx.DB

func initDB() {
	var err error
	db, err = sqlx.Connect("postgres", "user=postgres password=12345 dbname=abc_pharmacy sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}
}

func main() {
	initDB()
	router := gin.Default()

	// Enable CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.GET("/items", getItems)
	router.POST("/items", addItem)
	router.PUT("/items/:id", editItem)
	router.DELETE("/items/:id", deleteItem)
	router.GET("/items/:id", getItemByID)

	router.GET("/invoices", getInvoices)
	router.POST("/invoices", createInvoice)
	router.PUT("/invoices/:id", editInvoice)
	router.DELETE("/invoices/:id", deleteInvoice)
	router.GET("/invoices/:id", getInvoiceByID)

	router.Run(":8080")
}

func getItems(c *gin.Context) {
	var items []Item
	err := db.Select(&items, "SELECT * FROM items")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func getItemByID(c *gin.Context) {
	id := c.Param("id")
	var item Item
	err := db.Get(&item, "SELECT * FROM items WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func addItem(c *gin.Context) {
	var item Item
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err := db.NamedExec(`INSERT INTO items (name, unit_price, item_category) VALUES (:name, :unit_price, :item_category)`, &item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

func editItem(c *gin.Context) {
	var item Item
	id := c.Param("id")
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item.ID = id
	_, err := db.NamedExec(`UPDATE items SET name=:name, unit_price=:unit_price, item_category=:item_category WHERE id=:id`, &item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

func deleteItem(c *gin.Context) {
	id := c.Param("id")
	_, err := db.Exec("DELETE FROM items WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
}

func getInvoices(c *gin.Context) {
	var invoices []Invoice
	err := db.Select(&invoices, "SELECT * FROM invoices")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoices)
}

func getInvoiceByID(c *gin.Context) {
	id := c.Param("id")
	var invoice Invoice
	err := db.Get(&invoice, "SELECT * FROM invoices WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invoice not found"})
		return
	}
	c.JSON(http.StatusOK, invoice)
}

func createInvoice(c *gin.Context) {
	var invoice Invoice
	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	_, err := db.NamedExec(`INSERT INTO invoices (name, mobile_no, email, address, billing_type) VALUES (:name, :mobile_no, :email, :address, :billing_type)`, &invoice)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoice)
}

func editInvoice(c *gin.Context) {
	var invoice Invoice
	id := c.Param("id")
	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	invoice.ID = id
	_, err := db.NamedExec(`UPDATE invoices SET name=:name, mobile_no=:mobile_no, email=:email, address=:address, billing_type=:billing_type WHERE id=:id`, &invoice)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoice)
}

func deleteInvoice(c *gin.Context) {
	id := c.Param("id")
	_, err := db.Exec("DELETE FROM invoices WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Invoice deleted"})
}

type Item struct {
	ID           string  `json:"id" db:"id"`
	Name         string  `json:"name" db:"name"`
	UnitPrice    float64 `json:"unit_price" db:"unit_price"`
	ItemCategory string  `json:"item_category" db:"item_category"`
}

type Invoice struct {
	ID          string `json:"id" db:"id"`
	Name        string `json:"name" db:"name"`
	MobileNo    string `json:"mobile_no" db:"mobile_no"`
	Email       string `json:"email" db:"email"`
	Address     string `json:"address" db:"address"`
	BillingType string `json:"billing_type" db:"billing_type"`
}
