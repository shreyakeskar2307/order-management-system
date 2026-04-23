const express = require("express");
const http = require("http");
const cors = require("cors");

const { initSocket } = require("./sockets/socket");

const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const archiveRoutes = require("./routes/archiveRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/archive", archiveRoutes);

const server = http.createServer(app);

// INIT SOCKET
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});