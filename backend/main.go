package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create router
	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	
	// Session management
	api.HandleFunc("/session/create", createSessionHandler).Methods("POST")
	api.HandleFunc("/session/join/{id}", joinSessionHandler).Methods("GET")
	api.HandleFunc("/session/{id}", getSessionHandler).Methods("GET")
	
	// Recording management
	api.HandleFunc("/upload", uploadRecordingHandler).Methods("POST")
	api.HandleFunc("/recordings", getRecordingsHandler).Methods("GET")
	api.HandleFunc("/recordings/{id}", getRecordingHandler).Methods("GET")

	// Health check
	r.HandleFunc("/health", healthCheckHandler).Methods("GET")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(r)

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"healthy"}`))
}
