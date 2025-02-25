/** @format */

import connectDB from "@/lib/db";
import Category from "@/lib/modals/category";
import Product from "@/lib/modals/products";
import { Types } from "mongoose";
import Heading from "./Heading";
import Link from "next/link";
import ProductCards from "./ProductCards";

const ProductPageProducts = async ({ categoryId }) => {
  if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
    return "Invalid or missing category ID";
  }

  await connectDB;

  const category = await Category.findById(categoryId);
  if (!category) {
    return "Category not found";
  }
  const filter = {
    category: new Types.ObjectId(categoryId),
  };

  const products = await Product.find(filter).limit(4).lean();

  return (
    <>
      <Heading text={"Related Products"} styles={"text-center mt-10 pt-10"} />
      <ProductCards products={JSON.parse(JSON.stringify(products))} />
      <div className='mt-10 text-center '>
        <Link
          href={`/products/category/${categoryId}`}
          className=' border border-black text-black font-bold py-4 px-4 rounded hover:bg-black hover:text-white'>
          View All Products
        </Link>
      </div>
    </>
  );
};

export default ProductPageProducts;
