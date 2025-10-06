// src/pages/JoinSession.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import apiService from "../services/api";

export default function JoinSession() {
  const [sessionId, setSessionId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinSession = async (e) => {
    e.preventDefault();
    if (!sessionId.trim()) return;

    setIsJoining(true);
    setError("");
    
    try {
      await apiService.joinSession(sessionId);
      navigate(`/session/${sessionId}`);
    } catch (error) {
      console.error('Error joining session:', error);
      setError('Session not found. Please check the session ID.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="app-container px-6">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Join Recording Session</h1>
            
            <form onSubmit={handleJoinSession} className="space-y-6">
              <Input
                label="Session ID or Link"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="Enter session ID or paste the link..."
                error={error}
                required
              />
              <p className="text-xs text-slate-500">
                You can enter just the session ID or paste the full session link
              </p>

              <Button
                type="submit"
                disabled={isJoining || !sessionId.trim()}
                className="w-full"
              >
                {isJoining ? "Joining..." : "Join Session"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-100 rounded-md">
              <h3 className="font-semibold text-sm mb-2">Before joining:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Make sure your microphone and camera are working</li>
                <li>• Use headphones to avoid echo</li>
                <li>• Find a quiet location for best audio quality</li>
                <li>• Test your internet connection</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}