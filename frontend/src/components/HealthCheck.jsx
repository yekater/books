import React, { useState } from "react";
import { checkHealth } from "../api/books";

export default function HealthCheck() {
  const [status, setStatus] = useState("");

  const handleCheck = async () => {
    try {
      await checkHealth();
      setStatus("Connection open ✅");
    } catch {
      setStatus("No connection ❌");
    }
  };

  return (
    <div>
      <button onClick={handleCheck}>Check Connection</button>
      <p>{status}</p>
    </div>
  );
}
