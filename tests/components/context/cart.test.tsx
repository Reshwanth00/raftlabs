import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

describe("CartContext", () => {
  it("adds item to cart with quantity 1", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        _id: "1",
        name: "Pizza",
        price: 299,
      });
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].qty).toBe(1);
  });
});









describe("CartContext", () => {
  it("adds item to cart with quantity 1", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        _id: "1",
        name: "Pizza",
        price: 299,
      });
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].qty).toBe(1);
  });

  it("increments quantity when same item is added again", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        _id: "1",
        name: "Pizza",
        price: 299,
      });
    });

    act(() => {
      result.current.addItem({
        _id: "1",
        name: "Pizza",
        price: 299,
      });
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].qty).toBe(2);
  });
});



it("clears the cart", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addItem({
      _id: "1",
      name: "Pizza",
      price: 299,
    });
  });

  act(() => {
    result.current.clearCart();
  });

  expect(result.current.cart.length).toBe(0);
});





it("calculates total price correctly", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addItem({
      _id: "1",
      name: "Pizza",
      price: 300,
    });
  });

  act(() => {
    result.current.addItem({
      _id: "2",
      name: "Burger",
      price: 100,
    });
  });

  act(() => {
    result.current.addItem({
      _id: "1",
      name: "Pizza",
      price: 300,
    });
  });

  // cart now:
  // Pizza → 2 × 300 = 600
  // Burger → 1 × 100 = 100
  // Total = 700

  const total = result.current.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  expect(total).toBe(700);
});





it("calculates total item count correctly", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addItem({
      _id: "1",
      name: "Pizza",
      price: 200,
    });
  });

  act(() => {
    result.current.addItem({
      _id: "1",
      name: "Pizza",
      price: 200,
    });
  });

  act(() => {
    result.current.addItem({
      _id: "2",
      name: "Burger",
      price: 100,
    });
  });

  // Pizza → qty 2
  // Burger → qty 1
  // Total count = 3

  const totalItems = result.current.cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  expect(totalItems).toBe(3);
});





