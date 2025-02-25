/** @format */

import connectDB from "@/lib/db";
import Product from "@/lib/modals/products";
import FeaturedProductCard from "@/app/components/FeaturedProductCard";
import { ConvertToSerializableObj } from "@/lib/ConvertToSerializableObject";
const HomeProducts = async () => {
  const sortOrder = "-1"; // Default sort order is now ascending (1)
  const sortBy = "createdAt"; // Default sort field is now "name"

  await connectDB();
  const sort = {};
  sort[sortBy] = sortOrder === "-1" ? -1 : 1; //  1 for ascending, -1 for descending.  Reverse the conditional to default to ascending.
  const prods = await Product.find({}).sort(sort).limit(2).lean();

  const products = ConvertToSerializableObj(prods);

  return (
    <section className='mt-10 text-white bg-black px-2 pt-6 pb-10'>
      <div className='container-xl lg:container mx-auto'>
        <h2 className='text-3xl font-bold text-white mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {products.map((product) => (
            <FeaturedProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
