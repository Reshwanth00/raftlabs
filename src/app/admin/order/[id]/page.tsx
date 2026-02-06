"use client";

import { useEffect, useState, use } from "react";
import { io, Socket } from "socket.io-client";

type Params = { id: string };

const STATUSES = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
];

export default function AdminOrderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = use(params);

  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  // 🔌 connect socket once
  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // 📦 fetch order
  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setStatus(data.status);
      });
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    // optimistic UI
    setStatus(newStatus);

    // 1️⃣ update DB
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    const updated = await res.json();

    // 2️⃣ emit socket ONLY after success
    socket?.emit("order-status", {
      orderId: updated._id,
      status: updated.status,
    });

    console.log("🔥 SOCKET EMITTED:", updated.status);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-black">
          Order #{order._id.slice(-6)}
        </h1>

        {/* Customer */}
        <div className="rounded-lg bg-white p-4 shadow text-black">
          <h2 className="font-semibold mb-2">Customer</h2>
          <p>Name: {order.customer.name}</p>
          <p>Address: {order.customer.address}</p>
          <p>Phone: {order.customer.phone}</p>
        </div>

        {/* Items */}
        <div className="rounded-lg bg-white p-4 shadow text-black">
          <h2 className="font-semibold mb-2">Items</h2>
          <div className="space-y-2">
            {order.items.map((item: any) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Control */}
        <div className="rounded-lg bg-white p-4 shadow text-black">
          <h2 className="font-semibold mb-2">Order Status</h2>

          <select
            value={status}
            onChange={e => updateStatus(e.target.value)}
            className="mt-1 rounded border px-3 py-2"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
