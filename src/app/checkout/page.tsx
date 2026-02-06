"use client";

import { useRouter } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const placeOrder = async (customer: any) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map(i => ({
          menuId: i._id,
          quantity: i.qty,
        })),
        customer,
      }),
    });

    const order = await res.json();
    clearCart();
    router.push(`/order/${order._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black px-4">
      <div className="w-full max-w-3xl">
        <div className="rounded-xl bg-white p-6 shadow-md md:p-8">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
            Checkout
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Form */}
            <CheckoutForm onSubmit={placeOrder} />

            {/* Summary */}
            <div className="rounded-lg border bg-gray-50 p-4">
              <h2 className="mb-4 font-medium text-black">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                {cart.map(item => (
                  <div
                    key={item._id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
