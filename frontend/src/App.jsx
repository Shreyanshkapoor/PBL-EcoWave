// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import Recordings from "./pages/Recordings";
import RecordingSession from "./pages/RecordingSession";

export default function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-session" element={<CreateSession />} />
            <Route path="/join-session" element={<JoinSession />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/session/:sessionId" element={<RecordingSession />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}