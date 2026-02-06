import mongoose, { Schema, Model, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  description?: string;
  price: number;
  image?: string;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
  },
  { timestamps: true }
);

const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem ||
  mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;
