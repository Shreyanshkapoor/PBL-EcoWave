package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"echowave-backend/internal/models"
	"echowave-backend/internal/storage"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// UploadRecordingHandler handles recording uploads
func UploadRecordingHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse multipart form
		err := r.ParseMultipartForm(32 << 20) // 32 MB max
		if err != nil {
			http.Error(w, "Failed to parse multipart form", http.StatusBadRequest)
			return
		}

		// Get session ID
		sessionID := r.FormValue("sessionId")
		if sessionID == "" {
			http.Error(w, "Session ID is required", http.StatusBadRequest)
			return
		}

		// Check if session exists
		session, err := store.GetSession(sessionID)
		if err != nil {
			http.Error(w, "Session not found", http.StatusNotFound)
			return
		}

		// Get uploaded file
		file, handler, err := r.FormFile("recording")
		if err != nil {
			http.Error(w, "Failed to get uploaded file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		// Create recordings directory if it doesn't exist
		recordingsDir := "recordings"
		if err := os.MkdirAll(recordingsDir, 0755); err != nil {
			http.Error(w, "Failed to create recordings directory", http.StatusInternalServerError)
			return
		}

		// Generate unique filename
		recordingID := uuid.New().String()
		filename := fmt.Sprintf("%s_%s_%s", sessionID, recordingID, handler.Filename)
		filepath := filepath.Join(recordingsDir, filename)

		// Create file on disk
		dst, err := os.Create(filepath)
		if err != nil {
			http.Error(w, "Failed to create file", http.StatusInternalServerError)
			return
		}
		defer dst.Close()

		// Copy uploaded file to destination
		if _, err := io.Copy(dst, file); err != nil {
			http.Error(w, "Failed to save file", http.StatusInternalServerError)
			return
		}

		// Create recording record
		recording := &models.Recording{
			ID:        uuid.New().String(),
			SessionID: sessionID,
			Name:      session.Name,
			FilePath:  filepath,
			FileSize:  handler.Size,
			Size:      fmt.Sprintf("%.1f MB", float64(handler.Size)/(1024*1024)),
			Duration:  0, // TODO: Calculate actual duration
			Format:    "webm",
			Quality:   "high",
			Status:    "ready",
			CreatedAt: time.Now(),
		}

		if err := store.CreateRecording(recording); err != nil {
			http.Error(w, "Failed to save recording metadata", http.StatusInternalServerError)
			return
		}

		// Update session status
		session.Status = "completed"
		store.UpdateSession(session)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(recording)
	}
}

// GetRecordingsHandler handles getting all recordings
func GetRecordingsHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		recordings, err := store.GetAllRecordings()
		if err != nil {
			http.Error(w, "Failed to fetch recordings", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(recordings)
	}
}

// GetRecordingHandler handles getting a specific recording
func GetRecordingHandler(store storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		recordingID := vars["id"]

		recording, err := store.GetRecording(recordingID)
		if err != nil {
			http.Error(w, "Recording not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(recording)
	}
}
