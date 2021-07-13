package middlewares

import (
	"backend/repositories"
	"backend/utils"
	"errors"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/julienschmidt/httprouter"
)

func IsAuthenticated(h httprouter.Handle, UserRepo *repositories.UserRepo) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		tokenString := r.Header.Get("Authorization")

		token, err := utils.VerifyToken(tokenString)
		if err != nil {
			utils.ErrorResponse(w, errors.New("not authenticated"))
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			data := claims["data"].(map[string]interface{})
			username := data["username"].(string)

			// logger.Output(1, username)
			_, DBErr := UserRepo.FindByUsername(username)
			if DBErr != nil {
				utils.ErrorResponse(w, errors.New("not authenticated"))
				return
			}

			h(w, r, ps)

		} else {
			utils.ErrorResponse(w, errors.New("not authenticated"))
		}
	}
}

func RouteLogger(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger := log.Default()
		logger.Println(r.URL)
		h.ServeHTTP(w, r)
	})
}
