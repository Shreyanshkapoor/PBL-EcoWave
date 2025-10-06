package storage

import "errors"

var (
	ErrSessionNotFound   = errors.New("session not found")
	ErrRecordingNotFound = errors.New("recording not found")
	ErrUserNotFound      = errors.New("user not found")
)

