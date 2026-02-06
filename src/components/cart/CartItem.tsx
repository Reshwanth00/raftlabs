"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ item }: { item: any }) {
  const { addItem, decreaseItem, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between rounded-lg text-black border bg-white p-4 shadow-sm">
      <div>
        <h4 className="font-medium text-black">{item.name}</h4>
        <p className="text-sm text-black">
          ₹{item.price} × {item.qty}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => decreaseItem(item._id)}
            className="h-7 w-7 rounded bg-gray-200 text-lg"
          >
            −
          </button>

          <span className="min-w-[20px] text-center">
            {item.qty}
          </span>

          <button
            onClick={() => addItem(item)}
            className="h-7 w-7 rounded bg-gray-200 text-lg"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item._id)}
            className="ml-4 text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="font-semibold">
        ₹{item.price * item.qty}
      </div>
    </div>
  );
}
