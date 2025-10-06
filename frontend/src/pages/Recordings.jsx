// src/pages/Recordings.jsx
import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { formatDate } from "../utils/formatTime";
import apiService from "../services/api";

export default function Recordings() {
  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const data = await apiService.getRecordings();
        setRecordings(data);
      } catch (error) {
        console.error('Error fetching recordings:', error);
        setError('Failed to load recordings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  const handlePlay = (recordingId) => {
    // TODO: Implement playback functionality
    console.log('Playing recording:', recordingId);
  };

  const handleDownload = (recordingId) => {
    // TODO: Implement download functionality
    console.log('Downloading recording:', recordingId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="app-container px-6">
          <div className="text-center">
            <div className="text-lg">Loading recordings...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="app-container px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Recordings</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {recordings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-slate-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No recordings yet</h3>
              <p className="text-slate-600 mb-6">Start by creating a recording session to capture your first podcast.</p>
              <a href="/create-session" className="btn btn-primary">Create Session</a>
            </Card>
          ) : (
            <div className="space-y-4">
              {recordings.map((recording) => (
                <Card key={recording.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{recording.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Duration: {recording.duration}</span>
                        <span>Size: {recording.size}</span>
                        <span>Created: {formatDate(recording.created_at)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          recording.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {recording.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePlay(recording.id)}
                      >
                        Play
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDownload(recording.id)}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}