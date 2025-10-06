// src/pages/CreateSession.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import apiService from "../services/api";

export default function CreateSession() {
  const [sessionName, setSessionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!sessionName.trim()) return;

    setIsCreating(true);
    setError("");
    
    try {
      const session = await apiService.createSession({ name: sessionName });
      navigate(`/session/${session.id}`);
    } catch (error) {
      console.error('Error creating session:', error);
      setError('Failed to create session. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="app-container px-6">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Recording Session</h1>
            
            <form onSubmit={handleCreateSession} className="space-y-6">
              <Input
                label="Session Name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="Enter session name..."
                error={error}
                required
              />

              <Button
                type="submit"
                disabled={isCreating || !sessionName.trim()}
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Session"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-100 rounded-md">
              <h3 className="font-semibold text-sm mb-2">What happens next?</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• A unique session link will be generated</li>
                <li>• Share the link with your guests</li>
                <li>• Start recording when everyone joins</li>
                <li>• Recordings will be saved automatically</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}