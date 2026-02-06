import { connectDB } from "@/lib/db";
import MenuItem from "@/lib/models/MenuItem";

/**
 * GET /api/menu
 */
export async function GET() {
  await connectDB();
  const menu = await MenuItem.find().lean();
  return Response.json(menu);
}

/**
 * POST /api/menu
 * body: { name, description, price, image }
 */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { name, description, price, image } = body;

  if (!name || !price) {
    return Response.json(
      { message: "name and price are required" },
      { status: 400 }
    );
  }

  const item = await MenuItem.create({
    name,
    description,
    price,
    image,
  });

  return Response.json(item, { status: 201 });
}
