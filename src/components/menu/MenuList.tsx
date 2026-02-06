"use client";

import MenuItemCard from "./MenuItemCard";

export default function MenuList({ menu }: { menu: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menu.map(item => (
        <MenuItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
