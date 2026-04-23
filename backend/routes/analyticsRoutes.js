const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Orders per day
router.get("/orders-per-day", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(created_at) as day, COUNT(*) as total_orders
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY day DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Revenue per store
router.get("/revenue-per-store", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT store_id, SUM(total_amount) as revenue
      FROM orders
      GROUP BY store_id
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Top products (simple version)
router.get("/top-products", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT items, COUNT(*) as count
      FROM orders
      GROUP BY items
      ORDER BY count DESC
      LIMIT 5
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;