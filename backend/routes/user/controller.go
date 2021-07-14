package user

import (
	"backend/repositories"
	"backend/utils"
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

type UserController struct {
	UserDataRepo *repositories.UserDataRepo
	UserRepo     *repositories.UserRepo
	ActivityRepo *repositories.ActivityRepo
}

func (h *UserController) GetUserById(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	userId := r.Header.Get("userid")
	user, err := h.UserDataRepo.FindByID(userId)
	if err != nil {
		utils.ErrorResponse(w, err)
		return
	}

	utils.SuccessResponse(w, user)
}

type PointReq struct {
	Userid int
	Points int
	Method string
}

func (h *UserController) UpdatePoints(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var pointReq PointReq
	decoder := json.NewDecoder(r.Body)

	jsonErr := decoder.Decode(&pointReq)
	if jsonErr != nil {
		utils.ErrorResponse(w, jsonErr)
		return
	}

	err := h.UserDataRepo.SetPoints(pointReq.Userid, pointReq.Points, pointReq.Method)
	if err != nil {
		utils.ErrorResponse(w, err)
		return
	}

	utils.SuccessResponseWithMessage(w, nil, "Successfully Updated Points")
}

func (h *UserController) GetActivites(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	userid := r.Header.Get("userid")
	activities, err := h.ActivityRepo.GetActivitesByUserid(userid)
	if err != nil {
		utils.ErrorResponse(w, err)
	}

	utils.SuccessResponse(w, activities)
}
