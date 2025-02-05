/** @format */

import connect from "@/lib/db";
import User from "@/lib/modals/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Types } from "mongoose"; // Import Types for ObjectId validation

/**
 * GET request handler to retrieve all users.
 *
 * @returns {NextResponse} A response object containing an array of users or an error.
 */
export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(users, { status: 200 }); // No need to stringify
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error
    return new NextResponse(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
};

/**
 * POST request handler to create a new user.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object containing the newly created user or an error.
 */
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { username, password, ...otherData } = body;

    await connect();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new NextResponse(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      ...otherData,
    });

    await user.save();
    return new NextResponse(user, { status: 201 }); // No need to stringify
  } catch (error) {
    console.error("Error creating user:", error); // Log the error
    return new NextResponse(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
};

/**
 * PATCH request handler to update a user's username.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object containing the updated user or an error.
 */
export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        { message: "UserId or new username not found" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      // Use imported Types
      return new NextResponse({ message: "Invalid UserId" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // No need for new ObjectId() here
      { username: newUsername },
      { new: true, runValidators: true } // Add runValidators
    );

    if (!updatedUser) {
      return new NextResponse(
        { message: "User not found in db" },
        { status: 404 }
      ); // 404 is more appropriate
    }

    return new NextResponse(updatedUser, { status: 200 }); // No need to stringify
  } catch (error) {
    console.error("Error updating user:", error); // Log the error
    return new NextResponse(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
};

/**
 * DELETE request handler to delete a user.
 *
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A response object indicating success or failure.
 */
export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse({ message: "UserId not found" }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      // Use imported Types
      return new NextResponse({ message: "Invalid UserId" }, { status: 400 });
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete(userId); // No need for new ObjectId() here

    if (!deletedUser) {
      return new NextResponse(
        { message: "User not found in db" },
        { status: 404 }
      ); // 404 is more appropriate
    }

    return new NextResponse(deletedUser, { status: 200 }); // No need to stringify
  } catch (error) {
    console.error("Error deleting user:", error); // Log the error
    return new NextResponse(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
};
