package main

import (
	"log"
	"net/http"

	"echowave-backend/internal/config"
	"echowave-backend/internal/handlers"
	"echowave-backend/internal/middleware"
	"echowave-backend/internal/storage"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize storage (try PostgreSQL first, fallback to memory)
	var store storage.Storage

	store, err = storage.NewDatabaseStorage(cfg.Database.DSN)
	if err != nil {
		log.Printf("Failed to connect to PostgreSQL: %v", err)
		log.Println("Falling back to in-memory storage...")
		store = storage.NewMemoryStorage()
	} else {
		log.Println("Connected to PostgreSQL database")
		defer store.Close()
	}

	// Create router
	r := mux.NewRouter()

	// Apply middleware
	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.RecoveryMiddleware)

	// API routes
	api := r.PathPrefix("/api").Subrouter()

	// Session management
	api.HandleFunc("/session/create", handlers.CreateSessionHandler(store)).Methods(http.MethodPost)
	api.HandleFunc("/session/join/{id}", handlers.JoinSessionHandler(store)).Methods(http.MethodGet)
	api.HandleFunc("/session/{id}", handlers.GetSessionHandler(store)).Methods(http.MethodGet)

	// Recording management
	api.HandleFunc("/upload", handlers.UploadRecordingHandler(store)).Methods(http.MethodPost)
	api.HandleFunc("/recordings", handlers.GetRecordingsHandler(store)).Methods(http.MethodGet)
	api.HandleFunc("/recordings/{id}", handlers.GetRecordingHandler(store)).Methods(http.MethodGet)

	// Health check
	r.HandleFunc("/health", handlers.HealthCheckHandler).Methods(http.MethodGet)

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   cfg.CORS.AllowedOrigins,
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	// Start server
	log.Printf("✅ Server starting on port %s", cfg.Server.Port)
	log.Printf("🗄️ Database in use: %s", cfg.Database.Name)

	if err := http.ListenAndServe(":"+cfg.Server.Port, handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
