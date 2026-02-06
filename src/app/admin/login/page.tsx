"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@delivery.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    router.push("/admin/order");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-bold text-black">
          Admin Login
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        )}

        <input
          value={email}                       
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2 text-black"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}                   
          placeholder="Password"
          className="mb-4 w-full rounded border px-3 py-2 text-black"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
