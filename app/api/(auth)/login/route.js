/** @format */

import connect from "@/lib/db";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * POST request handler for user login.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object containing the JWT token and user information, or an error.
 */
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    await connect();

    const user = await User.findOne({ username });
    if (!user) {
      return new NextResponse({ message: "User not found" }, { status: 404 }); // Consistent JSON response
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new NextResponse({ message: "Invalid password" }, { status: 401 }); // Consistent JSON response
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT secret is not defined in environment variables"); // Log the error for debugging
      return new NextResponse(
        { message: "JWT secret is missing" },
        { status: 500 }
      ); // Return a 500 error to the client
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secret,
      { expiresIn: "1h" }
    );

    return new NextResponse(
      {
        token,
        user: { id: user._id, username: user.username },
      },
      { status: 200 }
    ); // No need to stringify
  } catch (error) {
    console.error("Error during login:", error); // Log the error with context
    return new NextResponse(
      { message: "An error occurred during login" },
      { status: 500 }
    ); // Consistent JSON response
  }
};
