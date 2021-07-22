package models

// User ..
type UserData struct {
	Userid string
	Name   string
	YOP    string
	Dept   string
	Points int
}

// UserRepository ..
type UserDataRepository interface {
	FindByID(ID int) (*UserData, error)
	Save(user *UserData) error
}
