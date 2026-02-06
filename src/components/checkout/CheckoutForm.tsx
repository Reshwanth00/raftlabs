"use client";

import { useState } from "react";
import {
  validateCheckout,
  CheckoutData,
} from "@/lib/validators/checkout";

export default function CheckoutForm({
  onSubmit,
}: {
  onSubmit: (data: CheckoutData) => void;
}) {
  const [data, setData] = useState<CheckoutData>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutData, string>>
  >({});

  const handleSubmit = () => {
    const validationErrors = validateCheckout(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(data);
  };

  const bind =
    (key: keyof CheckoutData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData({ ...data, [key]: e.target.value });

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-semibold text-black">
        Checkout
      </h2>

      <div>
        <input
          placeholder="Name"
          className="w-full rounded border px-3 py-2 text-black"
          onChange={bind("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Address"
          className="w-full rounded border px-3 py-2 text-black"
          onChange={bind("address")}
        />
        {errors.address && (
          <p className="text-sm text-red-600">
            {errors.address}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Phone"
          className="w-full rounded border px-3 py-2 text-black"
          onChange={bind("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Email"
          className="w-full rounded border px-3 py-2 text-black"
          onChange={bind("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
      >
        Place Order
      </button>
    </div>
  );
}
