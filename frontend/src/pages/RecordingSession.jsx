// src/pages/RecordingSession.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useMediaRecorder } from "../hooks/useMediaRecorder";
import { formatTime } from "../utils/formatTime";
import apiService from "../services/api";

export default function RecordingSession() {
  const { sessionId } = useParams();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const {
    isRecording,
    isPaused,
    recordedChunks,
    error: mediaError,
    startRecording,
    pauseRecording,
    stopRecording,
    getRecordingBlob
  } = useMediaRecorder();

  useEffect(() => {
    // Fetch session info
    const fetchSessionInfo = async () => {
      try {
        const data = await apiService.getSession(sessionId);
        setSessionInfo(data);
      } catch (error) {
        console.error('Error fetching session info:', error);
        setSessionInfo({
          id: sessionId,
          name: `Recording Session ${sessionId}`,
          status: 'active'
        });
      }
    };

    fetchSessionInfo();
  }, [sessionId]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      setError('Failed to start recording. Please check permissions.');
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    
    // Upload recording
    const blob = getRecordingBlob();
    if (blob) {
      const formData = new FormData();
      formData.append('recording', blob, `session-${sessionId}-${Date.now()}.webm`);
      formData.append('sessionId', sessionId);

      try {
        await apiService.uploadRecording(formData);
        alert('Recording uploaded successfully!');
        setRecordingTime(0);
      } catch (error) {
        console.error('Error uploading recording:', error);
        alert('Failed to upload recording. Please try again.');
      }
    }
  };

  if (error || mediaError) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="app-container px-6">
          <div className="max-w-md mx-auto">
            <Card className="p-8 text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Error</h2>
              <p className="text-slate-600 mb-6">{error || mediaError}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
              >
                Try Again
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="app-container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Session Info */}
          <Card className="p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {sessionInfo?.name || `Session ${sessionId}`}
            </h1>
            <p className="text-slate-600">Session ID: {sessionId}</p>
            <div className="mt-4">
              <span className="text-sm text-slate-500">
                Share this link with guests: <code className="bg-slate-100 px-2 py-1 rounded">
                  {window.location.origin}/join-session
                </code>
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Preview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-64 object-cover"
                />
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    REC
                  </div>
                )}
              </div>
            </Card>

            {/* Recording Controls */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recording Controls</h2>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-mono font-bold text-slate-800">
                  {formatTime(recordingTime)}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Ready to record'}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <Button
                    onClick={handleStartRecording}
                    variant="primary"
                    size="lg"
                  >
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseRecording}
                      variant="outline"
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      onClick={handleStopRecording}
                      variant="danger"
                    >
                      Stop & Upload
                    </Button>
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-md">
                <h3 className="font-semibold text-sm mb-2">Recording Tips:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Use headphones to prevent echo</li>
                  <li>• Ensure good lighting for video quality</li>
                  <li>• Speak clearly and at a consistent volume</li>
                  <li>• Recordings are saved locally and uploaded when stopped</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}