// src/components/HowItWorks.jsx
import React from "react";

const Card = ({ title, className }) => (
  <div className={`card px-6 py-8 w-64 ${className}`}>
    <div className="font-semibold text-center">{title}</div>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="app-container px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <Card title="Local Recording" className="card-muted" />
          <Card title="Cloud Sync" className="card" />
          <Card title="Post-Production Studio" className="card-muted" />
        </div>

        <p className="font-semibold">
          Create studio-quality podcasts — Free Trial Today
        </p>

        <button className="mt-6 btn btn-primary">
          Start Recording Now
        </button>
      </div>
    </section>
  );
}
