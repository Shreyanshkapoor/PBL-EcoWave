# EchoWave Backend

A Go-based REST API for the EchoWave podcasting application.

## Features

- Session management (create, join, get)
- Recording upload and storage
- CORS support for frontend integration
- File storage for recordings

## API Endpoints

### Session Management
- `POST /api/session/create` - Create a new recording session
- `GET /api/session/join/{id}` - Join an existing session
- `GET /api/session/{id}` - Get session details

### Recording Management
- `POST /api/upload` - Upload recorded file
- `GET /api/recordings` - Get all recordings
- `GET /api/recordings/{id}` - Get specific recording

### Health Check
- `GET /health` - Health check endpoint

## Development Setup

1. Install Go 1.22 or later
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Run the server:
   ```bash
   go run .
   ```

The server will start on port 8080 by default, or the port specified in the `PORT` environment variable.

## Environment Variables

- `PORT` - Server port (default: 8080)

## File Storage

Recordings are stored in the `recordings/` directory. In production, this should be replaced with cloud storage (AWS S3, etc.).

## CORS

The server is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)

Update the CORS configuration in `main.go` for production deployment.



