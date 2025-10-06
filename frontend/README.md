# EchoWave - Podcast Recording Platform

EchoWave is a lightweight web-based podcasting application designed to record and manage high-quality audio and video sessions. This initial version focuses on core recording and playback functionality, laying the groundwork for future expansion into advanced podcast production features.

## Features

- **Session Management**: Create and join recording sessions
- **Local Recording**: High-quality audio and video recording using WebRTC/MediaRecorder API
- **File Upload**: Automatic upload of recordings to backend server
- **Playback**: View and playback recorded sessions
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Go (Golang)** - High-performance backend API
- **Gorilla Mux** - HTTP router and URL matcher
- **CORS** - Cross-origin resource sharing
- **File Storage** - Local file system (dev) / Cloud storage (prod)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Go 1.22+

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd echowave
   npm install
   ```

2. **Start both frontend and backend:**
   ```bash
   npm run dev:full
   ```

   This will start:
   - Frontend on `http://localhost:5173`
   - Backend API on `http://localhost:8080`

3. **Or run separately:**
   ```bash
   # Frontend only
   npm run dev
   
   # Backend only
   npm run backend
   ```

### Production Build

```bash
# Build frontend
npm run build

# Run backend
cd backend
go run .
```

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

## Usage

1. **Create a Session**: Navigate to "Create Session" and enter a session name
2. **Share the Link**: Copy the session link and share with guests
3. **Join Session**: Guests can join using the "Join Session" page
4. **Record**: Use the recording interface to capture audio/video
5. **Upload**: Recordings are automatically uploaded when stopped
6. **Playback**: View recordings in the "My Recordings" section

## Project Structure

```
echowave/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── HowItWorks.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── CreateSession.jsx
│   │   ├── JoinSession.jsx
│   │   ├── RecordingSession.jsx
│   │   └── Recordings.jsx
│   ├── App.jsx             # Main app component with routing
│   └── main.jsx            # App entry point
├── backend/
│   ├── main.go             # Backend server entry point
│   ├── handlers.go         # API route handlers
│   ├── go.mod              # Go dependencies
│   └── README.md           # Backend documentation
└── public/                 # Static assets
```

## Future Enhancements

The following features will be added after the core system is functional:

- Real-time chunked uploading during recording
- Automatic merging of multiple participants' tracks
- Audio post-processing (noise reduction, leveling)
- In-app editing suite
- Live streaming & scheduling
- User authentication and accounts
- Cloud storage integration (AWS S3, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.