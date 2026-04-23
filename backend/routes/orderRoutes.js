const express = require("express");
const router = express.Router();

const controller = require("../controllers/orderController");

// APIs
router.post("/orders", controller.createOrder);
router.get("/orders", controller.getOrders);
router.patch("/orders/:id/status", controller.updateStatus);

module.exports = router;