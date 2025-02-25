/** @format */

import connectDB from "@/lib/db";
import Product from "@/lib/modals/products";
import ProductCards from "./ProductCards";
const OurProducts = async () => {
  const sortOrder = "1"; // Default sort order is now ascending (1)
  const sortBy = "createdAt"; // Default sort field is now "name"

  await connectDB();
  const sort = {};
  sort[sortBy] = sortOrder === "-1" ? -1 : 1; //  1 for ascending, -1 for descending.  Reverse the conditional to default to ascending.
  const prods = await Product.find({}).sort(sort).limit(4).lean();

  return (
    <section className='mt-10 px-2 pt-6 pb-10'>
      <div className='container-xl lg:container mx-auto'>
        <h2 className='text-3xl font-bold text-black mb-6 text-center'>
          Our Product
        </h2>
        <ProductCards products={JSON.parse(JSON.stringify(prods))} />
      </div>
    </section>
  );
};

export default OurProducts;
