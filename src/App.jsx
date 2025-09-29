// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <footer className="bg-slate-900 h-20"></footer>
    </div>
  );
}
