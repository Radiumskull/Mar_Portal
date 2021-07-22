package main

import (
	"backend/database"
	"backend/routes"
	"backend/routes/middlewares"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
	_ "github.com/lib/pq"
)

func main() {
	router := httprouter.New()

	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	h := &routes.BaseHandler{DB: db}

	h.AuthHandler(router)
	h.UserHandler(router)

	newHandler := middlewares.RouteLogger(router)
	// handler := cors.Default().Handler(newHandler)

	log.Fatal(http.ListenAndServe(":8000", newHandler))
}
