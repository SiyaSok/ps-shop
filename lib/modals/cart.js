/** @format */

import { Schema, model, models } from "mongoose";

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        category: {
          type: Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
