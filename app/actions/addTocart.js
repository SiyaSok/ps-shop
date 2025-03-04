/** @format */
"use server";

import connectDB from "@/lib/db";
// import Category from "@/lib/modals/category";
// import Product from "@/lib/modals/products";

import { getSessionUser } from "@/lib/getSessionUser";
import Cart from "@/lib/modals/cart";
import Product from "@/lib/modals/products";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

async function addToCart(productId, quantity) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user ID is required");
  }

  const userId = sessionUser.userId;

  console.log(sessionUser.userId);

  console.log(productId, quantity);

  // Validate the user ID.
  if (!userId || !Types.ObjectId.isValid(userId)) {
    return { error: "Invalid or missing user ID" }, { status: 400 };
  }

  // Validate the product ID.
  if (!productId || !Types.ObjectId.isValid(productId)) {
    return { error: "Invalid or missing product ID" }, { status: 400 };
  }

  // Validate the quantity.
  if (!quantity || quantity < 1) {
    return { error: "Quantity must be at least 1" }, { status: 400 };
  }

  // Find the user's cart or create a new one if it doesn't exist.
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [], totalPrice: 0 });
  }

  // Find the product to get its details.
  const product = await Product.findById(productId);
  if (!product) {
    return { error: "Product not found" }, { status: 404 };
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
      title: product.title,
      price: product.price, // Ensure price is a valid number
      category: product.category,
      image: product.image,
      quantity,
    });
  }

  // Recalculate the total price of the cart.
  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + (item.price ? item.price * item.quantity : 0);
  }, 0);

  // Save the updated cart.
  await cart.save();

  revalidatePath("/", "layout");
}

export default addToCart;
