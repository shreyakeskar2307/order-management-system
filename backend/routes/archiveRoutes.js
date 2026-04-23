const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/archive-old-orders", async (req, res) => {
  try {
    await db.query(`
      INSERT INTO orders_archive
      SELECT * FROM orders
      WHERE created_at < NOW() - INTERVAL 30 DAY
    `);

    await db.query(`
      DELETE FROM orders
      WHERE created_at < NOW() - INTERVAL 30 DAY
    `);

    res.json({ message: "Archived successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;