/** @format */

import connectDB from "@/lib/db";
// import { ConvertToSerializableObj } from "@/lib/ConvertToSerializableObject";
import { simplifyProduct } from "@/lib/simplifiedProducts";
import Product from "@/lib/modals/products";
import ProductPageProducts from "@/app/components/ProductPageProducts";
import Breadcrumb from "@/app/components/Breadcrumb";
import ProductImages from "@/app/components/ProductImages";
import ProductDetails from "@/app/components/ProductDetails";
/** @format */
const page = async ({ params }) => {
  await connectDB();
  const prod = await Product.findById(params.id).lean();

  // const product = ConvertToSerializableObj(prod);
  const product = simplifyProduct(prod);

  return (
    <>
      <Breadcrumb prod={product} />
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6'>
        <ProductImages prod={product} />
        <ProductDetails prod={product} />
      </div>
      <ProductPageProducts categoryId={prod.category._id} />
    </>
  );
};

export default page;
