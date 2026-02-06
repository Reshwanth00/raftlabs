"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
    _id: string;
    name: string;
    price: number;
    qty: number;
};

type CartContextType = {
    cart: CartItem[];
    addItem: (item: any) => void;
    removeItem: (id: string) => void;
    decreaseItem: (id: string) => void;
    clearCart: () => void;
};


const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addItem = (item: any) => {
        setCart(prev => {
            const exists = prev.find(i => i._id === item._id);
            if (exists) {
                return prev.map(i =>
                    i._id === item._id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const decreaseItem = (id: string) => {
        setCart(prev =>
            prev
                .map(i =>
                    i._id === id ? { ...i, qty: i.qty - 1 } : i
                )
                .filter(i => i.qty > 0)
        );
    };

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(i => i._id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addItem, removeItem, decreaseItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
