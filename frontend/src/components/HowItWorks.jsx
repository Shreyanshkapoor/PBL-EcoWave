// src/components/HowItWorks.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./ui/Card";
import Button from "./ui/Button";

const StepCard = ({ title, description, variant = "default" }) => (
  <Card variant={variant} className="px-6 py-8 w-80">
    <div className="font-semibold text-center mb-2">{title}</div>
    <div className="text-sm text-slate-600 text-center">{description}</div>
  </Card>
);

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="app-container px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <StepCard 
            title="1. Create Session" 
            description="Host creates a recording session and shares the link with guests"
            variant="muted"
          />
          <StepCard 
            title="2. Join & Record" 
            description="Guests join via link and record high-quality audio/video locally"
            variant="default"
          />
          <StepCard 
            title="3. Upload & Playback" 
            description="Recordings are uploaded and available for instant playback"
            variant="muted"
          />
        </div>

        <p className="font-semibold mb-6">
          Start recording studio-quality podcasts in minutes
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/create-session">
            <Button variant="primary">
              Create Session
            </Button>
          </Link>
          <Link to="/join-session">
            <Button variant="outline">
              Join Session
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}