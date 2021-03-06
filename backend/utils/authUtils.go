package utils

import (
	"backend/models"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func CreateToken(user *models.User) (string, error) {
	var err error
	//Creating Access Token
	claims := &jwt.MapClaims{
		"iss": "issuer",
		"exp": time.Now().Add(time.Hour * 99999).Unix(),
		"data": map[string]interface{}{
			"username": user.Username,
			"userid":   strconv.Itoa(user.Userid),
		},
	}
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := at.SignedString([]byte("WeLoveGito"))
	if err != nil {
		return "", err
	}
	return token, nil
}

func VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("WeLoveGito"), nil
	})

	return token, err
}
