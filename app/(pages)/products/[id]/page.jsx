/** @format */

import connectDB from "@/lib/db";
import Product from "@/lib/modals/products";
import ProductPageProducts from "@/app/components/ProductPageProducts";
import Breadcrumb from "@/app/components/Breadcrumb";
import ProductImages from "@/app/components/ProductImages";
import ProductDetails from "@/app/components/ProductDetails";
/** @format */
const page = async ({ params }) => {
  await connectDB();
  const prod = await Product.findById(params.id).lean();

  return (
    <>
      <Breadcrumb prod={JSON.parse(JSON.stringify(prod))} />
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6'>
        <ProductImages prod={JSON.parse(JSON.stringify(prod))} />
        <ProductDetails prod={JSON.parse(JSON.stringify(prod))} />
      </div>
      <ProductPageProducts categoryId={prod.category} />
    </>
  );
};

export default page;
