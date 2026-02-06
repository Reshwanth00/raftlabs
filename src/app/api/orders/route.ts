import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import MenuItem from "@/lib/models/MenuItem";
import { simulateOrderStatus } from "@/lib/orderStatus";
import {
  validateCheckout,
  CheckoutData,
} from "@/lib/validators/checkout";

/**
 * POST /api/orders
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { items, customer } = body as {
      items: any[];
      customer: CheckoutData;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        { message: "items are required" },
        { status: 400 }
      );
    }

    if (!customer) {
      return Response.json(
        { message: "customer is required" },
        { status: 400 }
      );
    }

    // ✅ validate customer input
    const validationErrors = validateCheckout(customer);
    if (Object.keys(validationErrors).length > 0) {
      return Response.json(
        {
          message: "Invalid customer details",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // fetch menu items from DB
    const menuItems = await MenuItem.find({
      _id: { $in: items.map((i: any) => i.menuId) },
    });

    if (menuItems.length !== items.length) {
      return Response.json(
        { message: "One or more menu items are invalid" },
        { status: 400 }
      );
    }

    // build order items snapshot
    const orderItems = items.map((item: any) => {
      const menu = menuItems.find(
        (m) => m._id.toString() === item.menuId
      );

      return {
        menuId: menu!._id,
        name: menu!.name,
        price: menu!.price,
        quantity: item.quantity,
      };
    });

    // create order
    const order = await Order.create({
      items: orderItems,
      customer,
      status: "Order Received",
    });

    // simulate future status updates
    simulateOrderStatus(order._id.toString());

    return Response.json(order, { status: 201 });
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    return Response.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders
 */
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    return Response.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
