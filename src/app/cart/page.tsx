"use client";

import { useRouter } from "next/navigation";
import CartList from "@/components/cart/CartList";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-black">🛒 Your Cart</h1>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl p-6">
        <CartList cart={cart} />

        {cart.length > 0 && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-green-600">₹{total}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
