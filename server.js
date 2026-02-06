const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("✅ Connected:", socket.id);

    socket.on("join-order", (orderId) => {
      socket.join(orderId);
      console.log(`📦 ${socket.id} joined order ${orderId}`);
    });

    socket.on("order-status", (data) => {
      console.log("🔥 Status update:", data);
      io.to(data.orderId).emit("order-status", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });

  httpServer.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
});
