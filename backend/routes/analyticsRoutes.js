const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =======================
// ORDERS PER DAY
// =======================
router.get("/orders-per-day", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(created_at) as day,
             COUNT(*) as total_orders
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY day DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// =======================
// REVENUE PER STORE
// =======================
router.get("/revenue-per-store", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT store_id,
             SUM(total_amount) as revenue
      FROM orders
      GROUP BY store_id
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// =======================
// TOP PRODUCTS
// =======================
router.get("/top-products", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT items FROM orders`);

    let map = {};

    rows.forEach((row) => {
      let items = [];

      try {
        items = JSON.parse(row.items);
      } catch {
        items = [];
      }

      items.forEach((i) => {
        const name = i.name || "unknown";
        map[name] = (map[name] || 0) + (i.qty || 1);
      });
    });

    const result = Object.keys(map).map((key) => ({
      product: key,
      count: map[key],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;