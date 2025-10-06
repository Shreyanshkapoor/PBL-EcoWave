// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import mic from "../assets/mic.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="app-container px-6 py-20 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-2/3">
          <h1 className="title-xl mb-4">
            Record studio-quality podcasts anywhere
          </h1>
          <p className="text-slate-300 mb-6">
            EchoWave lets you record studio-quality podcasts with guests, 
            manage sessions, and playback recordings instantly.
          </p>

          <div className="flex items-start gap-6">
            <Link to="/create-session">
              <Button variant="primary" size="lg">
                Create Session
              </Button>
            </Link>
            <Link to="/join-session">
              <Button variant="ghost" size="lg" className="border border-white/20">
                Join Session
              </Button>
            </Link>
          </div>

          <p className="copy-muted mt-3 text-sm">No account required to get started.</p>

          <div className="mt-12 text-center lg:text-left text-slate-400 text-sm">
            <p>Perfect for podcasters, content creators & businesses</p>
            <div className="flex gap-6 justify-center lg:justify-start mt-4">
              <span>Remote Interviews</span>
              <span>Podcast Recording</span>
              <span>Webinars</span>
              <span>Team Meetings</span>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/3 flex justify-center lg:justify-end">
          <div className="hero-figure">
            <img
              src={mic}
              alt="microphone"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}