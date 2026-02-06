"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-black">
          Admin – Orders
        </h1>

        <div className="space-y-4">
          {orders.map(order => (
            <Link
              key={order._id}
              href={`/admin/order/${order._id}`}
              className="block rounded-lg bg-white p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between text-black">
                <span className="font-medium">
                  Order #{order._id.slice(-6)}
                </span>
                <span className="font-semibold">
                  {order.status}
                </span>
              </div>

              <div className="mt-2 text-sm text-black">
                Items: {order.items.length}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
