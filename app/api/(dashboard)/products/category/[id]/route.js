/** @format */

import connect from "@/lib/db";
import Category from "@/lib/modals/category";
import Product from "@/lib/modals/products";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request, context) => {
  const { searchParams } = new URL(request.url);
  const categoryId = context.params.id;
  const limit = parseInt(searchParams.get("limit") || "16");
  const sortOrder = searchParams.get("sortOrder") || "1"; // Default sort order is ascending (1)
  const sortBy = searchParams.get("sortBy") || "title"; // Corrected "tiltle" to "title"
  const page = parseInt(searchParams.get("page") || "1"); // Define `page`
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    await connect();

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("Invalid or missing category ID", {
        status: 400,
      });
    }

    const sort = {};
    sort[sortBy] = sortOrder === "-1" ? -1 : 1;

    const filter = {
      category: new Types.ObjectId(categoryId),
    };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new NextResponse(`Error in fetching products: ${errorMessage}`, {
      status: 500,
    });
  }
};
