/** @format */

import { AiOutlineTrophy } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuBadgeCheck } from "react-icons/lu";

const ProductPageFooter = () => {
  return (
    <div className='bg-black p-8  mt-10'>
      <div className='container py-6 mx-auto'>
        <div className='flex flex-col text-white items-start  md:items-center gap-4 justify-around md:flex-row'>
          <div className='flex items-center gap-4'>
            <AiOutlineTrophy className='text-4xl md:text-6xl' />
            <div className='flex iteams-center flex-col text-white'>
              <h3 className='text-2xl font-bold'>High Quality</h3>
              <p>crafted from top materials</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <LuBadgeCheck className='text-4xl md:text-6xl' />
            <div className='flex iteams-center flex-col text-white'>
              <h3 className='text-2xl font-bold'>Warranty Protection</h3>
              <p>Over 2 years</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <LiaShippingFastSolid className='text-4xl md:text-6xl' />
            <div className='flex iteams-center flex-col text-white'>
              <h3 className='text-2xl font-bold'>Free Shipping</h3>
              <p>Order over 550 Rand</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <BiSupport className='text-4xl md:text-6xl' />
            <div className='flex iteams-center flex-col text-white'>
              <h3 className='text-2xl font-bold'>24 / 7 Support</h3>
              <p>Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageFooter;
