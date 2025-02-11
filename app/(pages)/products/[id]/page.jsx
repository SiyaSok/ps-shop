/** @format */

import connectDB from "@/lib/db";
import Product from "@/lib/modals/products";
import Image from "next/image";
import ProductPageProducts from "@/app/components/ProductPageProducts";
import { MdArrowForwardIos } from "react-icons/md";
/** @format */
const page = async ({ params }) => {
  await connectDB();
  const prod = await Product.findById(params.id).lean();

  return (
    <>
      <section className='bg-orange-100 p-4'>
        <div className='container mx-auto flex flex-col md:flex-row items-center gap-4 md:justify-between py-8'>
          <p className='text-lg md:text-xl flex items-center justify-center gap-4'>
            <span className='font-semibold'>Home</span> <MdArrowForwardIos />
            <span className='font-semibold'>Products</span>
            <MdArrowForwardIos />
            {" |"}
            <span className='font-semibold'>{prod.title}</span>
          </p>
        </div>
      </section>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6'>
        {/* Left Image */}
        <div className='p-2 '>
          <div className='bg-yellow-600 h-32 flex '>
            <Image
              width={100}
              height={100}
              src={prod.image}
              alt={prod.title}
              className='rounded object-cover' // Added object-cover
            />
          </div>
        </div>

        {/* Main Image */}
        <div className='md:w-1/2 bg-yellow-600 rounded-lg flex items-center justify-center  overflow-hidden'>
          {" "}
          {/* Added width and overflow-hidden */}
          <Image
            width={1000} // Keep original width for responsiveness
            height={600} // Keep original height for aspect ratio
            src={prod.image}
            alt={prod.title}
            className='rounded object-cover bg-yellow-600' // Added object-cover
            layout='responsive' // Make image responsive
            objectFit='cover' // Cover the container
          />
        </div>

        {/* Product Details */}
        <div className='flex flex-col justify-between p-4 space-y-2 md:w-1/2'>
          {" "}
          {/* Added width for larger screens */}
          <div>
            <h1 className='text-4xl font-semibold'>{prod.title}</h1>
            <p className='text-3xl text-gray-600 mt-4'>R {prod.price}</p>
            <p className='text-lg mt-4'>{prod.description}</p>
          </div>
          <div>
            {/* Buttons */}
            <div className='flex gap-4 items-baseline'>
              <input
                type='number'
                min={1}
                defaultValue={1}
                className='p-4 text-black border w-20 rounded-lg border-black'
              />
              <button className='bg-tranparent text-black py-4 px-4 border  border-black rounded-lg hover:bg-black hover:text-white'>
                Add to Cart
              </button>
              <button className='bg-tranparent text-black py-4 px-4 border  border-black rounded-lg hover:bg-black hover:text-white'>
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductPageProducts />
    </>
  );
};

export default page;
