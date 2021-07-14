package repositories

import (
	"backend/models"
	"database/sql"
	"strconv"
)

// UserRepo implements models.UserRepository
type UserDataRepo struct {
	db *sql.DB
}

// NewUserRepo ..
func NewUserDataRepo(db *sql.DB) *UserDataRepo {
	return &UserDataRepo{
		db: db,
	}
}

// FindByID ..
func (r *UserDataRepo) FindByID(ID string) (*models.UserData, error) {
	var user models.UserData
	err := r.db.QueryRow("select userid, name, yop, department, points from userdata where userid = $1", ID).Scan(&user.Userid, &user.Name, &user.YOP, &user.Dept, &user.Points)
	return &user, err
}

func (r *UserDataRepo) SetPoints(userId int, points int, METHOD string) error {
	var pts = 0
	if METHOD == "INCREMENT" {
		pts = points
	}

	if METHOD == "DECREMENT" {
		pts = points * -1
	}

	sqlQuery := "UPDATE userdata SET points = points + " + strconv.Itoa(pts) + " WHERE userid = " + strconv.Itoa(userId)
	_, err := r.db.Exec(sqlQuery)
	return err
}

// Save ..
func (r *UserDataRepo) Save(user *models.UserData) error {
	err := r.db.QueryRow("insert into userdata(userid, name, yop, department) values($1, $2, $3, $4)", user.Userid, user.Name, user.YOP, user.Dept).Err()
	return err
}
