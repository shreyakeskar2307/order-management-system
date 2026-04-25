"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE DATA NORMALIZER
  const normalizeOrders = (data: any) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  // 🔥 LOAD ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      const safeOrders = normalizeOrders(data);
      setOrders(safeOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // 🔥 NEW ORDER SOCKET EVENT
    socket.on("new_order", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    // 🔥 ORDER UPDATE SOCKET EVENT
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* ✅ CENTER CARD (50% SCREEN) */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-6">
          🛒 Orders Dashboard
        </h1>

        {/* LOADING STATE */}
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">

            {/* ORDERS LIST */}
            {orders.map((o) => (
              <div
                key={o.id}
                className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">
                    Order #{o.id}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      o.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="mt-2 text-sm text-gray-600">
                  {(() => {
                    let items: any[] = [];
                    try {
                      items = JSON.parse(o.items || "[]");
                    } catch {
                      items = [];
                    }

                    return items.map((i, idx) => (
                      <span
                        key={idx}
                        className="inline-block mr-2 bg-white border px-2 py-1 rounded"
                      >
                        {i.name} × {i.qty}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}