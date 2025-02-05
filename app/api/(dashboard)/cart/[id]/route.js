/** @format */

import connect from "@/lib/db";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Cart from "@/lib/modals/cart";

/**
 * POST request handler for adding items to the user's cart.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object indicating the result of the operation.
 */
export const POST = async (request) => {
  try {
    // Parse the request body to get product ID and quantity.
    const body = await request.json();
    const { productId, quantity } = body;

    // Extract the user ID from the query parameters.
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Validate the user ID.
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("User ID not found or invalid", { status: 400 });
    }

    // Validate the product ID.
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return new NextResponse("Product ID not found or invalid", {
        status: 400,
      });
    }

    // Validate the quantity.
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return new NextResponse("Invalid quantity", { status: 400 });
    }

    // Connect to the database.
    await connect();

    // Find the user.
    const user = await User.findById(userId);

    // Check if the user exists.
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Find an existing cart item for the user and product.
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    // If the cart item exists, update the quantity.
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the cart item doesn't exist, create a new one.
      cartItem = new Cart({ user: userId, product: productId, quantity });
      await cartItem.save();
    }

    // Return a success response with the updated cart item.
    return new NextResponse(
      JSON.stringify({ message: "Item added to cart", cartItem }),
      { status: 201 }
    );
  } catch (error) {
    // Handle errors.
    if (error instanceof Error) {
      return new NextResponse("Error adding item to cart: " + error.message, {
        status: 500,
      });
    }
    return new NextResponse("An unknown error occurred.", { status: 500 });
  }
};

// export const DELETE = async (
//   request: Request,
//   { params }: { params: Params }
// ) => {
//   const cartItemId = params.id; // Extracting the cart item ID correctly

//   try {
//     if (!cartItemId || !Types.ObjectId.isValid(cartItemId)) {
//       return new NextResponse("Cart item ID not found or invalid", {
//         status: 400,
//       });
//     }

//     await connect();

//     const deletedCartItem = await Cart.findOneAndDelete({ _id: cartItemId });

//     if (!deletedCartItem) {
//       return new NextResponse("Cart item not found or could not be deleted", {
//         status: 404,
//       });
//     }

//     return new NextResponse(
//       JSON.stringify({
//         message: "Cart item deleted",
//         cartItem: deletedCartItem,
//       }),
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return new NextResponse("Error deleting cart item: " + error.message, {
//         status: 500,
//       });
//     }
//     return new NextResponse("An unknown error occurred.", { status: 500 });
//   }
// };

// export const PATCH = async (request: Request, context: { params: Params }) => {
//   const cartItemId = context.params.cartItemId; // More descriptive name

//   try {
//     const body = await request.json();
//     const { quantity, productId } = body; //  Expect quantity and productId in the body

//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");

//     if (!userId || !Types.ObjectId.isValid(userId)) {
//       return new NextResponse("User ID not found or invalid", { status: 400 });
//     }

//     if (!cartItemId || !Types.ObjectId.isValid(cartItemId)) {
//       return new NextResponse("Cart item ID not found or invalid", {
//         status: 400,
//       });
//     }

//     await connect();

//     const user = await User.findById(userId); // Verify user exists (important for authorization)

//     if (!user) {
//       return new NextResponse("User not found", { status: 404 }); // 404 is more appropriate here
//     }

//     const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });

//     if (!cartItem) {
//       return new NextResponse("Cart item not found", { status: 404 }); // 404 is more appropriate here
//     }

//     // Update the cart item
//     const updatedCartItem = await Cart.findByIdAndUpdate(
//       cartItemId,
//       { quantity, product: productId }, // Update quantity and product
//       { new: true, runValidators: true } // Important: run validators!
//     );

//     if (!updatedCartItem) {
//       return new NextResponse("Failed to update cart item", { status: 500 }); //Handle potential update failures
//     }

//     return new NextResponse(
//       JSON.stringify({
//         message: "Cart item updated",
//         cartItem: updatedCartItem,
//       }),
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return new NextResponse("Error updating cart item: " + error.message, {
//         status: 500,
//       });
//     }
//     return new NextResponse("An unknown error occurred.", { status: 500 });
//   }
// };
