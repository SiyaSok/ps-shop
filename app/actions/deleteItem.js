/** @format */
"use server";

import connectDB from "@/lib/db";
import Cart from "@/lib/modals/cart";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

async function deleteItem(productId, cartItemId) {
  await connectDB();

  // Validate IDs
  if (!cartItemId || !Types.ObjectId.isValid(cartItemId)) {
    return new ("Invalid cart item ID", { status: 400 })();
  }

  if (!productId || !Types.ObjectId.isValid(productId)) {
    return new ("Invalid product ID", { status: 400 })();
  }

  await Cart.findOneAndUpdate(
    { _id: cartItemId },
    { $pull: { items: { productId } } },
    { new: true }
  );

  revalidatePath("/", "layout");
}

export default deleteItem;
