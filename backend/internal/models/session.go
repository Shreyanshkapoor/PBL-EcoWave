package models

import "time"

// Session represents a recording session
type Session struct {
	ID              string     `json:"id"`
	Name            string     `json:"name"`
	Description     string     `json:"description,omitempty"`
	HostID          string     `json:"host_id,omitempty"`
	Status          string     `json:"status"`
	MaxParticipants int        `json:"max_participants,omitempty"`
	IsPublic        bool       `json:"is_public,omitempty"`
	ScheduledAt     *time.Time `json:"scheduled_at,omitempty"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
}

// Recording represents a recorded session
type Recording struct {
	ID        string    `json:"id"`
	SessionID string    `json:"session_id"`
	Name      string    `json:"name"`
	Duration  int       `json:"duration"`  // Duration in seconds
	FileSize  int64     `json:"file_size"` // File size in bytes
	Size      string    `json:"size"`      // Human readable size
	Format    string    `json:"format"`    // File format (webm, mp4, etc.)
	Quality   string    `json:"quality"`   // Recording quality
	Status    string    `json:"status"`    // Recording status
	FilePath  string    `json:"file_path"` // Path to the file
	CreatedAt time.Time `json:"created_at"`
}

// CreateSessionRequest represents the request to create a session
type CreateSessionRequest struct {
	Name            string     `json:"name"`
	Description     string     `json:"description,omitempty"`
	MaxParticipants int        `json:"max_participants,omitempty"`
	IsPublic        bool       `json:"is_public,omitempty"`
	ScheduledAt     *time.Time `json:"scheduled_at,omitempty"`
}

// APIResponse represents a standard API response
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
