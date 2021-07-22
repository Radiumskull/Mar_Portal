package models

type Activity struct {
	ActivityId  int
	Userid      int
	Name        string
	Category    string
	Date        string
	Certificate string
}

type ActivityRepo interface {
	FindByID(ID int) (*UserData, error)
	Save(user *UserData) error
}
