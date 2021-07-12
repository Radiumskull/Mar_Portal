package main

import (
	"backend/controllers"
	"backend/database"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {
	router := httprouter.New()

	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	h := &controllers.BaseHandler{DB: db}

	h.AuthHandler(router)
	h.UserHandler(router)

	handler := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
