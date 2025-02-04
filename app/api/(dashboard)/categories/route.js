/** @format */

import connect from "@/lib/db";
import Category from "@/lib/modals/category";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();

    const category = await Category.find();

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse("Error in fetching category: " + errorMessage, {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return new NextResponse(
        JSON.stringify({ message: "Title is required" }),
        {
          status: 400,
        }
      );
    }

    await connect();

    const category = await Category.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
    });

    if (category) {
      return new NextResponse(
        JSON.stringify({ message: "Category already exists" }),
        {
          status: 400,
        }
      );
    }

    const newCategory = new Category({ title });

    await newCategory.save();

    return new NextResponse(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse("Error in creating category: " + errorMessage, {
      status: 500,
    });
  }
};
