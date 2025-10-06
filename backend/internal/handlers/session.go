package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"echowave-backend/internal/models"
	"echowave-backend/internal/storage"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// CreateSessionHandler handles session creation
func CreateSessionHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CreateSessionRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if req.Name == "" {
			http.Error(w, "Session name is required", http.StatusBadRequest)
			return
		}

		session := &models.Session{
			ID:              uuid.New().String(),
			Name:            req.Name,
			Description:     req.Description,
			Status:          "active",
			MaxParticipants: req.MaxParticipants,
			IsPublic:        req.IsPublic,
			ScheduledAt:     req.ScheduledAt,
			CreatedAt:       time.Now(),
			UpdatedAt:       time.Now(),
		}

		if err := store.CreateSession(session); err != nil {
			http.Error(w, "Failed to create session", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(session)
	}
}

// JoinSessionHandler handles joining a session
func JoinSessionHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		sessionID := vars["id"]

		session, err := store.GetSession(sessionID)
		if err != nil {
			http.Error(w, "Session not found", http.StatusNotFound)
			return
		}

		if session.Status != "active" {
			http.Error(w, "Session is not active", http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
	}
}

// GetSessionHandler handles getting session details
func GetSessionHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		sessionID := vars["id"]

		session, err := store.GetSession(sessionID)
		if err != nil {
			http.Error(w, "Session not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
	}
}
