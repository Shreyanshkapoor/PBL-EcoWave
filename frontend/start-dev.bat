@echo off
echo Starting EchoWave Development Environment...
echo.

echo Installing frontend dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd backend
go mod tidy
cd ..

echo.
echo Starting both frontend and backend...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:8080
echo.

call npm run dev:full
