// src/components/Hero.jsx
import React from "react";
import mic from "../assets/mic.jpg"; // or: '/mic.jpg' if in public/

export default function Hero() {
  return (
    <section className="hero">
      <div className="app-container px-6 py-20 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-2/3">
          <h1 className="title-xl mb-4">
            Record studio-quality podcasts anywhere
          </h1>
          <p className="text-slate-300 mb-6">
            EcoWave lets you record locally in full quality, sync seamlessly,
            and edit instantly.
          </p>

          <div className="flex items-start gap-6">
            <button className="btn btn-primary">
              Start Recording Now
            </button>
          </div>

          <p className="copy-muted mt-3 text-sm">No credit card needed.</p>

          <div className="mt-12 text-center lg:text-left text-slate-400 text-sm">
            <p>Trusted by individuals & businesses</p>
            <div className="flex gap-6 justify-center lg:justify-start mt-4">
              <span>Forbes</span>
              <span>ST</span>
              <span>TC</span>
              <span>TN</span>
              <span>The Verge</span>
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
