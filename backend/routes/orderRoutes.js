const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateStatus,
} = require("../controllers/orderController");

// REQUIRED BY TASK
router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id/status", updateStatus);

module.exports = router;