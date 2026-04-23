"use client";

import { useState } from "react";

export default function UpdateStatus() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const update = async () => {
    await fetch(`http://localhost:8081/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    alert("Status Updated");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Status
        </h2>

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Order ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <select
          className="w-full p-3 border rounded mb-6"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="PLACED">PLACED</option>
          <option value="PREPARING">PREPARING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <button
          onClick={update}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Update
        </button>

      </div>
    </div>
  );
}