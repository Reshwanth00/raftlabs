import mongoose, { Schema, Model, Document } from "mongoose";

export type OrderStatus =
  | "Order Received"
  | "Preparing"
  | "Out for Delivery";

interface OrderItem {
  menuId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

export interface IOrder extends Document {
  items: OrderItem[];
  customer: CustomerInfo;
  status: OrderStatus;
}

const OrderSchema = new Schema<IOrder>(
  {
    items: [
      {
        menuId: { type: Schema.Types.ObjectId, required: true },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    customer: {
      name: String,
      address: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["Order Received", "Preparing", "Out for Delivery"],
      default: "Order Received",
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
