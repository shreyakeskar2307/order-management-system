"use client";

import { useState } from "react";

export default function Orders() {
  const [storeId, setStoreId] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await fetch(
      `http://localhost:8081/api/orders?store_id=${storeId}`
    );
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h2 className="text-3xl font-bold mb-6">Orders</h2>

      <div className="flex gap-3 mb-6">
        <input
          className="p-2 border rounded w-64"
          placeholder="Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
        />

        <button
          onClick={fetchOrders}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>

      <div className="grid gap-4">

        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-bold">Order #{o.id}</p>
              <p className="text-gray-500">Store: {o.store_id}</p>
            </div>

            <div className="font-semibold text-blue-600">
              {o.status}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}