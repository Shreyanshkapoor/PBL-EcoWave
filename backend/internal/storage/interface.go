package storage

import "echowave-backend/internal/models"

// Storage defines the interface for data storage
type Storage interface {
	// Session methods
	CreateSession(session *models.Session) error
	GetSession(id string) (*models.Session, error)
	UpdateSession(session *models.Session) error

	// Recording methods
	CreateRecording(recording *models.Recording) error
	GetRecording(id string) (*models.Recording, error)
	GetAllRecordings() ([]*models.Recording, error)
}

func (s Storage) Close() {
	panic("unimplemented")
}
