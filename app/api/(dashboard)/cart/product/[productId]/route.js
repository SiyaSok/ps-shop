/** @format */

import connect from "@/lib/db";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Cart from "@/lib/modals/cart";

export const DELETE = async (request) => {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.split("/").pop(); // Extract productId from URL
    const cartItemId = url.searchParams.get("cartItemId");

    console.log({ productId, cartItemId });

    // Validate IDs
    if (!cartItemId || !Types.ObjectId.isValid(cartItemId)) {
      return new NextResponse("Invalid cart item ID", { status: 400 });
    }

    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    await connect();

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartItemId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    console.log({ updatedCart });

    if (!updatedCart) {
      return new NextResponse("Cart item not found or could not be deleted", {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Cart item deleted",
        cart: updatedCart,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      `Error deleting cart item: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
};
