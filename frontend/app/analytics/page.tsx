"use client";

import { useEffect, useState } from "react";

export default function Analytics() {
  const [ordersPerDay, setOrdersPerDay] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/orders-per-day")
      .then((res) => res.json())
      .then(setOrdersPerDay);

    fetch("http://localhost:5000/api/analytics/revenue-per-store")
      .then((res) => res.json())
      .then(setRevenue);

    fetch("http://localhost:5000/api/analytics/top-products")
      .then((res) => res.json())
      .then(setTopProducts);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Analytics Dashboard</h1>

      <h2>Orders Per Day</h2>
      {ordersPerDay.map((o, i) => (
        <div key={i}>
          {o.day} - {o.total_orders}
        </div>
      ))}

      <h2>Revenue Per Store</h2>
      {revenue.map((r, i) => (
        <div key={i}>
          Store {r.store_id} - ₹{r.revenue}
        </div>
      ))}

      <h2>Top Products</h2>
      {topProducts.map((p, i) => (
        <div key={i}>
          {p.items} - {p.count}
        </div>
      ))}
    </div>
  );
}