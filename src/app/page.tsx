"use client";

import { useEffect, useState } from "react";
import MenuList from "@/components/menu/MenuList";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(setMenu);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-black">
          Food Delivery
        </h1>

        <div className="flex items-center gap-3">
          {/* Admin Login */}

                    <Link
            href="/order"
            className="rounded-lg border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition"
          >
            My orders
          </Link>


          <Link
            href="/admin/login"
            className="rounded-lg border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition"
          >
            Login
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </header>


      {/* Content */}
      <main className="mx-auto max-w-7xl p-6">
        <MenuList menu={menu} />
      </main>
    </div>
  );
}
