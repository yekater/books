import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  const [health, setHealth] = useState("");

  const checkHealth = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/health");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setHealth(`Connection open ✅ (${text})`);
    } catch (err) {
      console.error(err);
      setHealth("No connection ❌");
    }
  };

  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📚 MyBooks App</h1>
          <div className="flex gap-2">
            <Link
              to="/"
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Home
            </Link>
            <button
              onClick={checkHealth}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Connection
            </button>
          </div>
        </header>

        {health && <p className="mb-4">{health}</p>}

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
