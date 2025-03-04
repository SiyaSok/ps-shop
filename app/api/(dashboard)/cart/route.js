/** @format */

import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connect from "@/lib/db";
import Cart from "@/lib/modals/cart";
import Product from "@/lib/modals/products";

/**
 * GET request handler to retrieve the user's cart.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object containing the cart data or an error.
 */
export const GET = async (request) => {
  try {
    // Connect to the database.
    await connect();

    // Extract the user ID from the query parameters.
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Validate the user ID.
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    // Find the cart associated with the user.
    const cart = await Cart.findOne({ user: userId });

    // If the cart is not found, return a 404.
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    // Return the cart data.
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    // Handle errors and return a 500 status with error details.
    return NextResponse.json(
      { error: "Error fetching cart", details: error },
      { status: 500 }
    );
  }
};

/**
 * POST request handler to update the user's cart.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object containing the updated cart data or an error.
 */
export const POST = async (request) => {
  try {
    // Connect to the database.
    await connect();

    // Parse the request body to get user ID and items.
    const { userId, items } = await request.json();
    const { productId, quantity } = items; // Destructure productId and quantity from items

    // Validate the user ID.
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    // Validate the product ID.
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid or missing product ID" },
        { status: 400 }
      );
    }

    // Validate the quantity.
    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // Find the user's cart or create a new one if it doesn't exist.
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    console.log({ cart });

    // Find the product to get its details.
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.log({ product });

    // Check if the product is already in the cart.
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    // If the product exists, update the quantity.
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart.
      cart.items.push({
        productId: productId,
        title: product.title || "Unknown Product",
        price: product.price || 0, // Ensure price is a valid number
        category: product.category || "Unknown",
        image: product.image || "",
        quantity,
      });
    }

    // Recalculate the total price of the cart.
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.price ? item.price * item.quantity : 0);
    }, 0);

    console.log({ cart });

    // Save the updated cart.
    await cart.save();

    // Return the updated cart data.
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    // Log the error for debugging.
    console.error("Error updating cart: ", error);
    // Return a 500 status with a generic error message.
    return NextResponse.json({ error: "Error updating cart" }, { status: 500 });
  }
};
