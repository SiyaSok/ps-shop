/** @format */
import PageHero from "@/app/components/PageHero";
import ProductCards from "@/app/components/ProductCards";
import ProductPageFooter from "@/app/components/ProductPageFooter";
import Pagination from "@/app/components/Pagination";
import connectDB from "@/lib/db";
import SortFilter from "@/app/components/SortFilter";
import Product from "@/lib/modals/products";
import { Types } from "mongoose";

const Page = async ({ searchParams }) => {
  await connectDB();

  const {
    page = 1,
    limit = 12,
    category,
    sortBy = "createdAt",
    sortOrder,
  } = searchParams;
  const filter = {
    category: new Types.ObjectId(category),
  };

  const skip = (page - 1) * limit;
  const total = await Product.countDocuments({});
  const sort = {};
  sort[sortBy] = sortOrder === "-1" ? -1 : 1; //  1 for ascending, -1 for descending.  Reverse the conditional to default to ascending.
  let products = [];

  if (category) {
    products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  } else {
    products = await Product.find().sort(sort).skip(skip).limit(limit).lean();
  }

  const showPaginations = total > limit;

  return (
    <>
      <PageHero />
      <SortFilter productsTotal={total} />
      <ProductCards products={JSON.parse(JSON.stringify(products))} />
      {showPaginations && (
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(limit)}
          totalItems={parseInt(total)}
        />
      )}
      <ProductPageFooter />
    </>
  );
};

export default Page;
