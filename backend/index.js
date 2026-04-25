const express = require("express");
const cors = require("cors");
const http = require("http");

const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const { initSocket } = require("./sockets/socket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);

// SOCKET
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});