// src/components/layout/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/create-session", label: "Create Session" },
    { path: "/join-session", label: "Join Session" },
    { path: "/recordings", label: "My Recordings" }
  ];

  return (
    <header className="app-header">
      <div className="app-container px-6 py-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          EchoWave
        </Link>

        <nav className="hidden md:flex gap-8 text-sm">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`hover:underline ${
                location.pathname === item.path ? 'text-brand-blue' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}