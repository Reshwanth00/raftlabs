import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

type OrderStatus =
  | "Order Received"
  | "Preparing"
  | "Out for Delivery";


export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(order);
  } catch (err) {
    console.error("GET ORDER ERROR:", err);
    return Response.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const body = await req.json();
    const { status } = body as { status?: OrderStatus };

    const allowedStatuses: OrderStatus[] = [
      "Order Received",
      "Preparing",
      "Out for Delivery",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return Response.json(
        { message: "Invalid order status" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,              // ✅ USE id, NOT params.id
      { status },
      { new: true }
    );

    if (!order) {
      return Response.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }




    return Response.json(order);
  } catch (err) {
    console.error("UPDATE ORDER ERROR:", err);
    return Response.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}
