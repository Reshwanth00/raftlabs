"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function MenuItemCard({ item }: { item: any }) {
  const { cart, addItem, decreaseItem } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = cart.find(i => i._id === item._id);

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="mb-3 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900">
        {item.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
        {item.description}
      </p>

      {/* Price + Controls */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-green-600">
          ₹{item.price}
        </span>

        {/* Quantity controls */}
        {!cartItem ? (
          <button
            onClick={() => addItem(item)}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2 text-black">
            <button
              onClick={() => decreaseItem(item._id)}
              className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-lg"
            >
              −
            </button>

            <span className="min-w-[20px] text-center font-medium">
              {cartItem.qty}
            </span>

            <button
              onClick={() => addItem(item)}
              className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-lg"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
