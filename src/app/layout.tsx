import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <CartProvider>
          {/* App shell */}
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
