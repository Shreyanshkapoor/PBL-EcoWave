package storage

import (
	"sync"

	"echowave-backend/internal/models"
)

// MemoryStorage implements in-memory storage for development
type MemoryStorage struct {
	sessions   map[string]*models.Session
	recordings map[string]*models.Recording
	mutex      sync.RWMutex
}

// NewMemoryStorage creates a new in-memory storage instance
func NewMemoryStorage() *MemoryStorage {
	return &MemoryStorage{
		sessions:   make(map[string]*models.Session),
		recordings: make(map[string]*models.Recording),
	}
}

// Session methods
func (s *MemoryStorage) CreateSession(session *models.Session) error {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.sessions[session.ID] = session
	return nil
}

func (s *MemoryStorage) GetSession(id string) (*models.Session, error) {
	s.mutex.RLock()
	defer s.mutex.RUnlock()
	session, exists := s.sessions[id]
	if !exists {
		return nil, ErrSessionNotFound
	}
	return session, nil
}

func (s *MemoryStorage) UpdateSession(session *models.Session) error {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.sessions[session.ID] = session
	return nil
}

// Recording methods
func (s *MemoryStorage) CreateRecording(recording *models.Recording) error {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.recordings[recording.ID] = recording
	return nil
}

func (s *MemoryStorage) GetRecording(id string) (*models.Recording, error) {
	s.mutex.RLock()
	defer s.mutex.RUnlock()
	recording, exists := s.recordings[id]
	if !exists {
		return nil, ErrRecordingNotFound
	}
	return recording, nil
}

func (s *MemoryStorage) GetAllRecordings() ([]*models.Recording, error) {
	s.mutex.RLock()
	defer s.mutex.RUnlock()

	var recordings []*models.Recording
	for _, recording := range s.recordings {
		recordings = append(recordings, recording)
	}
	return recordings, nil
}
