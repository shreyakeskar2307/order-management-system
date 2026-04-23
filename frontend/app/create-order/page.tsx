"use client";

import { useState } from "react";

export default function CreateOrder() {
  const [product, setProduct] = useState("");

  const createOrder = async () => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    setProduct("");
  };

  return (
    <div>
      <h1>Create Order</h1>

      <input
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter product"
      />

      <button onClick={createOrder}>Create</button>
    </div>
  );
}