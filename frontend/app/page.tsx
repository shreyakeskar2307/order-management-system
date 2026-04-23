"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    loadOrders();

    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderUpdated", (updated) => {
      setOrders((prev) =>
        prev.map((o) => (o.id == updated.id ? updated : o))
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  const loadOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  // ✅ FIXED CREATE ORDER (IMPORTANT)
  const createOrder = async () => {
    if (!item.trim()) return;

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_id: 1,
        items: JSON.stringify([
          {
            name: item,
            qty: 1,
          },
        ]),
        total_amount: 100,
      }),
    });

    setItem("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Orders Dashboard</h1>

      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item"
      />

      <button onClick={createOrder}>Create</button>

      <hr />

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o) => {
          let items = [];

          // ✅ SAFE PARSE (FIXES "x 1" ISSUE)
          try {
            items = JSON.parse(o.items || "[]");
          } catch (err) {
            items = [];
          }

          return (
            <div
              key={o.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <b>Items:</b>{" "}
              {items.length > 0 ? (
                items.map((i, idx) => (
                  <span key={idx}>
                    {i.name || "Unknown"} x {i.qty || 1}{" "}
                  </span>
                ))
              ) : (
                <span>Invalid Data</span>
              )}

              <br />

              <b>Status:</b> {o.status}
            </div>
          );
        })
      )}
    </div>
  );
}