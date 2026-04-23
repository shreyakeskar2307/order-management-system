"use client";

import { useState } from "react";

export default function CreateOrder() {
  const [storeId, setStoreId] = useState("");
  const [amount, setAmount] = useState("");

  const createOrder = async () => {
    await fetch("http://localhost:8081/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_id: Number(storeId),
        items: [{ item_id: 1, qty: 1 }],
        total_amount: Number(amount),
      }),
    });

    alert("Order Created");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Order
        </h2>

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-6"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={createOrder}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Create Order
        </button>

      </div>
    </div>
  );
}