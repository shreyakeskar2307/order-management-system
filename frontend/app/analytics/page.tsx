"use client";

import { useEffect, useState } from "react";

export default function Analytics() {
  const [ordersPerDay, setOrdersPerDay] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch("http://localhost:5000/api/analytics/orders-per-day");
        const res2 = await fetch("http://localhost:5000/api/analytics/revenue-per-store");
        const res3 = await fetch("http://localhost:5000/api/analytics/top-products");

        setOrdersPerDay(await res1.json());
        setRevenue(await res2.json());
        setTopProducts(await res3.json());
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Analytics Dashboard</h1>

      {/* ORDERS PER DAY */}
      <h2>Orders Per Day</h2>
      {ordersPerDay.length === 0 ? (
        <p>No data</p>
      ) : (
        ordersPerDay.map((o, i) => (
          <div key={i}>
            {o.day} → {o.total_orders}
          </div>
        ))
      )}

      {/* REVENUE */}
      <h2>Revenue Per Store</h2>
      {revenue.length === 0 ? (
        <p>No data</p>
      ) : (
        revenue.map((r, i) => (
          <div key={i}>
            Store {r.store_id} → ₹{r.revenue}
          </div>
        ))
      )}

      {/* TOP PRODUCTS */}
      <h2>Top Products</h2>
      {topProducts.length === 0 ? (
        <p>No data</p>
      ) : (
        topProducts.map((p, i) => (
          <div key={i}>
            {p.product} → {p.count}
          </div>
        ))
      )}
    </div>
  );
}