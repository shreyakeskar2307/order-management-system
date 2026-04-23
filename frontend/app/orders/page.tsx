"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 🔥 LOAD INITIAL DATA
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    // 🔥 NEW ORDER EVENT
    socket.on("new_order", (order) => {
      setOrders((prev) => [...prev, order]);
    });

    // 🔥 ORDER UPDATE EVENT
    socket.on("order_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === updatedOrder.id ? updatedOrder : o
        )
      );
    });

    return () => {
      socket.off("new_order");
      socket.off("order_updated");
    };
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o) => (
          <div key={o.id}>
            {o.product} - {o.status}
          </div>
        ))
      )}
    </div>
  );
}