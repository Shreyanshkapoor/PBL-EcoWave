package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// Session represents a recording session
type Session struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Recording represents a recorded session
type Recording struct {
	ID        string    `json:"id"`
	SessionID string    `json:"session_id"`
	Name      string    `json:"name"`
	Duration  string    `json:"duration"`
	Size      string    `json:"size"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	FilePath  string    `json:"file_path"`
}

// CreateSessionRequest represents the request to create a session
type CreateSessionRequest struct {
	Name string `json:"name"`
}

// In-memory storage for development (replace with database in production)
var sessions = make(map[string]*Session)
var recordings = make(map[string]*Recording)

func createSessionHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateSessionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "Session name is required", http.StatusBadRequest)
		return
	}

	session := &Session{
		ID:        uuid.New().String(),
		Name:      req.Name,
		Status:    "active",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	sessions[session.ID] = session

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(session)
}

func joinSessionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	sessionID := vars["id"]

	session, exists := sessions[sessionID]
	if !exists {
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

func getSessionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	sessionID := vars["id"]

	session, exists := sessions[sessionID]
	if !exists {
		http.Error(w, "Session not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(session)
}

func uploadRecordingHandler(w http.ResponseWriter, r *http.Request) {
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
	session, exists := sessions[sessionID]
	if !exists {
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
	recording := &Recording{
		ID:        recordingID,
		SessionID: sessionID,
		Name:      session.Name,
		Duration:  "00:00:00", // TODO: Calculate actual duration
		Size:      fmt.Sprintf("%.1f MB", float64(handler.Size)/(1024*1024)),
		Status:    "completed",
		CreatedAt: time.Now(),
		FilePath:  filepath,
	}

	recordings[recordingID] = recording

	// Update session status
	session.Status = "completed"
	session.UpdatedAt = time.Now()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(recording)
}

func getRecordingsHandler(w http.ResponseWriter, r *http.Request) {
	var recordingList []*Recording
	for _, recording := range recordings {
		recordingList = append(recordingList, recording)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(recordingList)
}

func getRecordingHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	recordingID := vars["id"]

	recording, exists := recordings[recordingID]
	if !exists {
		http.Error(w, "Recording not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(recording)
}
