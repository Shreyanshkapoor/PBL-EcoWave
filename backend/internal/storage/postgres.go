package storage

import (
	"database/sql"
	"fmt"

	"echowave-backend/internal/models"

	_ "github.com/lib/pq"
)

// PostgresStorage implements PostgreSQL storage
type PostgresStorage struct {
	db *sql.DB
}

// NewPostgresStorage creates a new PostgreSQL storage instance
func NewPostgresStorage(connStr string) (*PostgresStorage, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	storage := &PostgresStorage{db: db}

	// Create tables if they don't exist
	if err := storage.createTables(); err != nil {
		return nil, fmt.Errorf("failed to create tables: %w", err)
	}

	return storage, nil
}

// createTables creates the necessary database tables
func (s *PostgresStorage) createTables() error {
	// Create sessions table
	sessionsTable := `
	CREATE TABLE IF NOT EXISTS sessions (
		id VARCHAR(36) PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		status VARCHAR(50) NOT NULL DEFAULT 'active',
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
	);`

	// Create recordings table
	recordingsTable := `
	CREATE TABLE IF NOT EXISTS recordings (
		id VARCHAR(36) PRIMARY KEY,
		session_id VARCHAR(36) NOT NULL,
		name VARCHAR(255) NOT NULL,
		duration VARCHAR(20) NOT NULL DEFAULT '00:00:00',
		size VARCHAR(50) NOT NULL,
		status VARCHAR(50) NOT NULL DEFAULT 'completed',
		file_path TEXT NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
		FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
	);`

	// Create indexes
	indexes := []string{
		"CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);",
		"CREATE INDEX IF NOT EXISTS idx_recordings_session_id ON recordings(session_id);",
		"CREATE INDEX IF NOT EXISTS idx_recordings_created_at ON recordings(created_at);",
	}

	// Execute table creation
	if _, err := s.db.Exec(sessionsTable); err != nil {
		return fmt.Errorf("failed to create sessions table: %w", err)
	}

	if _, err := s.db.Exec(recordingsTable); err != nil {
		return fmt.Errorf("failed to create recordings table: %w", err)
	}

	// Execute index creation
	for _, index := range indexes {
		if _, err := s.db.Exec(index); err != nil {
			return fmt.Errorf("failed to create index: %w", err)
		}
	}

	return nil
}

// Close closes the database connection
func (s *PostgresStorage) Close() error {
	return s.db.Close()
}

// Session methods
func (s *PostgresStorage) CreateSession(session *models.Session) error {
	query := `
		INSERT INTO sessions (id, name, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5)`

	_, err := s.db.Exec(query, session.ID, session.Name, session.Status, session.CreatedAt, session.UpdatedAt)
	return err
}

func (s *PostgresStorage) GetSession(id string) (*models.Session, error) {
	query := `
		SELECT id, name, status, created_at, updated_at
		FROM sessions
		WHERE id = $1`

	session := &models.Session{}
	err := s.db.QueryRow(query, id).Scan(
		&session.ID,
		&session.Name,
		&session.Status,
		&session.CreatedAt,
		&session.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrSessionNotFound
	}

	if err != nil {
		return nil, err
	}

	return session, nil
}

func (s *PostgresStorage) UpdateSession(session *models.Session) error {
	query := `
		UPDATE sessions
		SET name = $2, status = $3, updated_at = $4
		WHERE id = $1`

	result, err := s.db.Exec(query, session.ID, session.Name, session.Status, session.UpdatedAt)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrSessionNotFound
	}

	return nil
}

// Recording methods
func (s *PostgresStorage) CreateRecording(recording *models.Recording) error {
	query := `
		INSERT INTO recordings (id, session_id, name, duration, size, status, file_path, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	_, err := s.db.Exec(query,
		recording.ID,
		recording.SessionID,
		recording.Name,
		recording.Duration,
		recording.Size,
		recording.Status,
		recording.FilePath,
		recording.CreatedAt,
	)

	return err
}

func (s *PostgresStorage) GetRecording(id string) (*models.Recording, error) {
	query := `
		SELECT id, session_id, name, duration, size, status, file_path, created_at
		FROM recordings
		WHERE id = $1`

	recording := &models.Recording{}
	err := s.db.QueryRow(query, id).Scan(
		&recording.ID,
		&recording.SessionID,
		&recording.Name,
		&recording.Duration,
		&recording.Size,
		&recording.Status,
		&recording.FilePath,
		&recording.CreatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrRecordingNotFound
	}

	if err != nil {
		return nil, err
	}

	return recording, nil
}

func (s *PostgresStorage) GetAllRecordings() ([]*models.Recording, error) {
	query := `
		SELECT id, session_id, name, duration, size, status, file_path, created_at
		FROM recordings
		ORDER BY created_at DESC`

	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var recordings []*models.Recording
	for rows.Next() {
		recording := &models.Recording{}
		err := rows.Scan(
			&recording.ID,
			&recording.SessionID,
			&recording.Name,
			&recording.Duration,
			&recording.Size,
			&recording.Status,
			&recording.FilePath,
			&recording.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		recordings = append(recordings, recording)
	}

	return recordings, nil
}
