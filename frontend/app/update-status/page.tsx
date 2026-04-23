"use client";

export default function UpdateStatus() {
  const updateStatus = async () => {
    await fetch("http://localhost:5000/api/orders/ID_HERE", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });
  };

  return (
    <div>
      <h1>Update Status</h1>
      <button onClick={updateStatus}>Mark Completed</button>
    </div>
  );
}