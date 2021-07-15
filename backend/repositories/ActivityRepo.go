package repositories

import (
	"backend/models"
	"database/sql"
	"log"
	"strconv"
)

type ActivityRepo struct {
	db *sql.DB
}

// NewUserRepo ..
func NewActivityRepo(db *sql.DB) *ActivityRepo {
	return &ActivityRepo{
		db: db,
	}
}

func (h *ActivityRepo) FindById(ID int) (models.Activity, error) {
	var activity models.Activity
	err := h.db.QueryRow("SELECT activityid, userid, name, year from activities").Scan(&activity)

	return activity, err
}

func (h *ActivityRepo) GetActivitesByUserid(Userid string) ([]models.Activity, error) {
	var activities []models.Activity
	rows, err := h.db.Query("SELECT activityid, userid, name, category, date_of_certification, certificate from activities WHERE userid = $1 AND EXTRACT(year from date_of_certification) = 2020", Userid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var activity models.Activity
		if err := rows.Scan(&activity.ActivityId, &activity.Userid, &activity.Name, &activity.Category, &activity.Date, &activity.Certificate); err != nil {
			return nil, err
		}
		activities = append(activities, activity)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return activities, nil
}

func (h *ActivityRepo) GetActivitesByYear(Userid string, Year string) ([]models.Activity, error) {
	var activities []models.Activity
	intYear, _ := strconv.ParseInt(Year, 10, 64)
	fromDate := strconv.Itoa(int(intYear-1)) + "-08-01"
	toDate := strconv.Itoa(int(intYear)) + "-08-01"

	log.Default().Output(1, toDate)
	rows, err := h.db.Query("SELECT activityid, userid, name, category, date_of_certification, certificate from activities WHERE userid = $1 AND date_of_certification >= $2 AND date_of_certification <= $3", Userid, fromDate, toDate)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var activity models.Activity
		if err := rows.Scan(&activity.ActivityId, &activity.Userid, &activity.Name, &activity.Category, &activity.Date, &activity.Certificate); err != nil {
			return nil, err
		}
		activities = append(activities, activity)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return activities, nil
}

func (h *ActivityRepo) Save(activity models.Activity) error {
	_, err := h.db.Exec("INSERT INTO activities(userid, name, category, date, certificate) VALUES($1, $2, $3, $4, $5)", activity.Userid, activity.Name, activity.Category, activity.Date, activity.Certificate)
	return err
}
