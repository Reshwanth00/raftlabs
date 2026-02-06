"use client";

import { useEffect, useState, use } from "react";
import { io, Socket } from "socket.io-client";
import OrderStatus from "@/components/order/OrderStatus";
import OrderItems from "@/components/order/OrderItems";

type Params = { id: string };

export default function OrderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = use(params);

  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  /* 1️⃣ Fetch order */
  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setStatus(data.status);
      });
  }, [id]);

  /* 2️⃣ Setup socket */
  useEffect(() => {
    const socketInstance = io("http://localhost:3000");

    socketInstance.emit("join-order", id);

    socketInstance.on("order-status", (data) => {
      console.log("🔔 Status update:", data);
      setStatus(data.status);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading order…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold text-black">
          Order Tracking
        </h1>

        <OrderStatus status={status} />
        <OrderItems items={order.items} />
      </div>
    </div>
  );
}
