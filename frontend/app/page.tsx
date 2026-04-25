"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadOrders();

    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    return () => socket.off("newOrder");
  }, []);

  const loadOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  const createOrder = async () => {
    if (!item.trim()) {
      alert("Enter item");
      return;
    }

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_id: 1,
        items: [
          {
            name: item.trim(),
            qty: Number(qty),
          },
        ],
        total_amount: 100,
      }),
    });

    setItem("");
    setQty(1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Orders Dashboard</h1>

      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item"
      />

      <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => setQty(e.target.value)}
        placeholder="Qty"
      />

      <button onClick={createOrder}>Create</button>

      <hr />

      {orders.map((o) => {
        let items = [];

        try {
          items =
            typeof o.items === "string"
              ? JSON.parse(o.items)
              : o.items;
        } catch {
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
            <b>Status:</b> {o.status}
            <br />

            <b>Items:</b>{" "}
            {items.map((i, idx) => (
              <span key={idx}>
                {i.name} x {i.qty}{" "}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}