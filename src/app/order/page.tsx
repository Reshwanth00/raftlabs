"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
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
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading orders…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold text-black">
          Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-black">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link
                key={order._id}
                href={`/order/${order._id}`}
                className="block rounded-lg bg-white p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between text-black">
                  <span className="font-medium">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span>{order.status}</span>
                </div>

                <div className="mt-2 text-sm text-black">
                  Items: {order.items.length}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
