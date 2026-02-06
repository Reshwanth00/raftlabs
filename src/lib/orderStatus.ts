import Order from "@/lib/models/Order";

export async function simulateOrderStatus(orderId: string) {

  setTimeout(async () => {
    await Order.findByIdAndUpdate(orderId, { status: "Preparing" });

  }, 5000);

  setTimeout(async () => {
    await Order.findByIdAndUpdate(orderId, { status: "Out for Delivery" });

  }, 10000);
}
