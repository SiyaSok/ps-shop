/** @format */
import connectDB from "@/lib/db";
import Category from "@/lib/modals/category";
import Product from "@/lib/modals/products";
import { Types } from "mongoose";
import ProductCards from "@/app/components/ProductCards";
import PageHero from "@/app/components/PageHero";

const Page = async ({ params }) => {
  await connectDB();

  const category = await Category.findById(params.id);
  if (!category) {
    return new (JSON.stringify({ message: "Category not found" }),
    {
      status: 404,
    })();
  }

  const filter = {
    category: new Types.ObjectId(params.id),
  };

  const products = await Product.find(filter)
    .populate("category", "title")
    .lean();

  return (
    <div>
      <PageHero catName={products[0].category.title} />
      <div className='mt-4'>
        <ProductCards products={JSON.parse(JSON.stringify(products))} />
      </div>
    </div>
  );
};

export default Page;
