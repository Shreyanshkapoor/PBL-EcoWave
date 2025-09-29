// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-container px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-bold">EcoWave</div>

        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#" className="hover:underline">
            Product
          </a>
          <a href="#" className="hover:underline">
            Solutions
          </a>
          <a href="#" className="hover:underline">
            Resources
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
        </nav>

        <div className="ml-4">
          <button className="btn btn-ghost">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
