import CartItem from "./CartItem";

export default function CartList({ cart }: { cart: any[] }) {
  if (cart.length === 0) {
    return (
      <p className="text-center text-black">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <div className="space-y-4 text-black">
      {cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
