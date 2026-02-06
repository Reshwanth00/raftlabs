const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

// 🔑 IMPORTANT: production-safe dev flag
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*", // OK for now; lock this down later
      methods: ["GET", "POST"],
    },
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

  // 🔑 IMPORTANT: Render decides the port
  const PORT = process.env.PORT || 3000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
