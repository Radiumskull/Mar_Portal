package user

import (
	"backend/repositories"
	"backend/utils"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type UserController struct {
	UserDataRepo *repositories.UserDataRepo
	UserRepo     *repositories.UserRepo
	ActivityRepo *repositories.ActivityRepo
}

func (r *UserController) GetUserById(w http.ResponseWriter, _ *http.Request, params httprouter.Params) {
	userId, _ := strconv.ParseInt(params.ByName("userid"), 10, 4)
	user, err := r.UserDataRepo.FindByID(int(userId))
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
		utils.SuccessResponse(w, jsonErr)
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
