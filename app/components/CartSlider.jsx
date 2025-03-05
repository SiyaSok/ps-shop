/** @format */

import Link from "next/link";
import { HiOutlineLockClosed } from "react-icons/hi";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";
// import { useState } from "react";
import CartSliderCard from "@/app/components/CartSliderCard";

const CartSlider = ({ setIsCartOpen }) => {
  const { cartItems } = useCart();
  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/50 z-40 flex justify-end'
      onClick={(e) => {
        if (e.target.id === "cart-backdrop") {
          setIsCartOpen(false);
        }
      }}
      id='cart-backdrop'>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className='absolute h-full right-0 w-[330px]  md:w-[380px] bg-white shadow-lg py-4 px-8 z-50'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold border-b py-4'>Shopping Cart</h2>
          <HiOutlineLockClosed className='text-2xl text-grey mr-4' />
        </div>
        {/* {error && <p className='text-red-500 text-sm'>{error}</p>} */}
        <CartSliderCard cartItems={cartItems} />
        {/* {cartItems.length > 0 ? (
          <ul className='h-9/10 overflow-y-auto min-w-sm'>
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className='flex items-center w-full py-2 gap-4 relative'>
                {deletingItemId === item.productId && (
                  <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm'>
                    Removing...
                  </div>
                )}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  a
                  height={80}
                  className='rounded'
                />
                <div className='flex-grow  min-w-sm'>
                  <p className='text-sm font-medium'>{item.title}</p>
                  <p className='text-xs text-gray-700 mt-2'>
                    {item.quantity} <span className='italic'>X</span>{" "}
                    <span className='text-yellow-700'>
                      R {item.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className='text-gray-500 hover:text-red-700'>
                  <IoIosCloseCircle className='text-2xl' />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-xs text-gray-500'>Cart is empty</p>
        )} */}
        <div className=' w-full absolute bottom-4 right-0 py-2 '>
          <div className='flex text-black w-full gap-2 items-center  mt-2 w-full py-8 px-6 border-b'>
            <div className='flex gap-1 items-center w-1/2'>Subtotal</div>
            <div className='flex gap-1 items-center w-1/2 text-yellow-700'>
              R {calculateTotal()?.toFixed(2)}
            </div>
          </div>
          <div className='flex text-white w-full gap-2 items-center justify-evenly mt-2 w-full py-4'>
            <div className='flex gap-1 items-center'>
              <button className='text-black border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white  md:w-full'>
                <Link href='/cart' onClick={() => setIsCartOpen(false)}>
                  Cart
                </Link>
              </button>
            </div>
            <div className='flex gap-1 items-center'>
              <button className='text-black border border-black rounded-full px-4 py-2  hover:bg-black hover:text-white md:w-full'>
                <Link href='/cart'>Compare</Link>
              </button>
            </div>
            <div className='flex gap-1 items-center'>
              <button className='text-black border border-black rounded-full px-4 py-2  hover:bg-black hover:text-white  md:w-full'>
                <Link href='/cart'>checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartSlider;
