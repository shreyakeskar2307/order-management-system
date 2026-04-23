// const db = require("../config/db");

// // =======================
// // CREATE ORDER
// // =======================
// exports.createOrder = (req, res) => {
//   const { store_id, items, total_amount } = req.body;

//   if (!store_id || !items || !total_amount) {
//     return res.status(400).json({ message: "All fields required" });
//   } 

//   if (!Array.isArray(items) || items.length === 0) {
//     return res.status(400).json({ message: "Items must be a non-empty array" });
//   }

//   const sql = `
//     INSERT INTO orders (store_id, items, total_amount, status)
//     VALUES (?, ?, ?, 'PLACED')
//   `;

//   db.query(
//     sql,
//     [store_id, JSON.stringify(items), total_amount],
//     (err, result) => {
//       if (err) return res.status(500).json(err);

//       res.json({
//         message: "Order created successfully",
//         orderId: result.insertId,
//       });
//     }
//   );
// };

// // =======================
// // GET ORDERS (PAGINATION)
// // =======================
// exports.getOrders = (req, res) => {
//   const { store_id, page = 1, limit = 10 } = req.query;

//   if (!store_id) {
//     return res.status(400).json({ message: "store_id required" });
//   }

//   const offset = (page - 1) * limit;

//   const sql = `
//     SELECT * FROM orders
//     WHERE store_id = ?
//     ORDER BY created_at DESC
//     LIMIT ? OFFSET ?
//   `;

//   db.query(sql, [store_id, Number(limit), Number(offset)], (err, results) => {
//     if (err) return res.status(500).json(err);

//     res.json(results);
//   });
// };

// // =======================
// // UPDATE ORDER STATUS
// // =======================
// exports.updateStatus = (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const allowed = ["PLACED", "PREPARING", "COMPLETED"];

//   if (!allowed.includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   const sql = `
//     UPDATE orders
//     SET status = ?
//     WHERE id = ?
//   `;

//   db.query(sql, [status, id], (err) => {
//     if (err) return res.status(500).json(err);

//     res.json({ message: "Status updated successfully" });
//   });
// };


const db = require("../config/db");
const { getIO } = require("../sockets/socket");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    let { store_id, items, total_amount } = req.body;

    if (!store_id || !items || !total_amount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (typeof items !== "string") {
      items = JSON.stringify(items);
    }

    const [result] = await db.query(
      `INSERT INTO orders (store_id, items, total_amount, status, created_at)
       VALUES (?, ?, ?, 'PLACED', NOW())`,
      [store_id, items, total_amount]
    );

    const newOrder = {
      id: result.insertId,
      store_id,
      items,
      total_amount,
      status: "PLACED",
    };

    getIO().emit("new_order", newOrder);

    res.json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ORDERS (WITH FILTER + PAGINATION)
exports.getOrders = async (req, res) => {
  try {
    const { store_id, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM orders";
    let params = [];

    if (store_id) {
      sql += " WHERE store_id = ?";
      params.push(store_id);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.query(sql, params);

    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["PLACED", "PREPARING", "COMPLETED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await db.query(
      "UPDATE orders SET status=? WHERE id=?",
      [status, id]
    );

    const updatedOrder = {
      id,
      status,
    };

    getIO().emit("order_updated", updatedOrder);

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};