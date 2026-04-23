const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (IMPORTANT: /api prefix)
app.use("/api", orderRoutes);

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



