export default function OrderItems({ items }: { items?: any[] }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No items found
      </p>
    );
  }

  return (
    <div className="space-y-2 text-black">
      {items.map((i) => (
        <div
          key={i.menuId}
          className="flex justify-between rounded-lg bg-white p-3 shadow-sm"
        >
          <span>
            {i.name} × {i.quantity}
          </span>
          <span className="font-medium">
            ₹{i.price * i.quantity}
          </span>
        </div>
      ))}
    </div>
  );
}
