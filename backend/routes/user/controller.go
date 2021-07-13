package user

import (
	"backend/repositories"
	"backend/utils"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type UserController struct {
	UserRepo *repositories.UserRepo
}

func (r *UserController) GetUserById(w http.ResponseWriter, _ *http.Request, params httprouter.Params) {
	userId, _ := strconv.ParseInt(params.ByName("id"), 10, 4)
	user, err := r.UserRepo.FindByID(int(userId))
	if err != nil {
		utils.ErrorResponse(w, err)
		return
	}

	utils.SuccessResponse(w, user)
}

func (r *UserController) GetUserByUsername(w http.ResponseWriter, _ *http.Request, params httprouter.Params) {
	username := params.ByName("username")
	user, err := r.UserRepo.FindByUsername(username)
	if err != nil {
		utils.ErrorResponse(w, err)
		return
	}

	utils.SuccessResponse(w, user)
}
