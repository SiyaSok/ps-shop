/** @format */
"use client";

import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import addToCart from "@/app/actions/addTocart";
import deleteItem from "@/app/actions/deleteItem";
import { toast } from "react-toastify";

const MainCartCard = ({ product, cart }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (plus) => {
    if (!product?.productId) return;
    setLoading(true);
    await addToCart(product.productId, 1, plus);
    setLoading(false);
    toast.success("Cart Updated Successfully");
  };

  const handleDelete = async () => {
    if (!product?.productId) return;
    setLoading(true);
    await deleteItem(product.productId, cart[0]._id);
    setLoading(false);
    toast.info("Item removed from cart");
  };

  return (
    <div className='relative flex items-center hover:bg-gray-100 -mx-8 px-4 py-3 '>
      {loading && (
        <div className='absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center'>
          <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}

      {/* Product Image and Title */}
      <div className='flex w-2/5'>
        <div className='w-20'>
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.title || "Product Image"}
            width={150}
            height={150}
            className='object-cover transition-opacity duration-300 group-hover:opacity-70'
          />
        </div>
        <div className='flex flex-col justify-center ml-4 flex-grow'>
          <span className='font-bold text-sm'>
            {product.title || "Unknown Product"}
          </span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className='flex justify-center w-1/5'>
        <svg
          className={` ${
            product.quantity === 1
              ? "hidden"
              : "fill-current text-black w-3 block cursor-pointer"
          } `}
          viewBox='0 0 448 512'
          onClick={() => handleAddToCart(false)}
          aria-label='Decrease quantity'>
          <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
        </svg>

        <input
          className='mx-2 text-center w-8'
          type='text'
          value={product.quantity || 0}
          onChange={() => {}}
          readOnly
        />

        <svg
          className='fill-current text-black w-3 cursor-pointer'
          viewBox='0 0 448 512'
          onClick={() => handleAddToCart(true)}
          aria-label='Increase quantity'>
          <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
        </svg>
      </div>

      {/* Pricing */}
      <span className='text-center w-1/5 font-semibold text-sm'>
        R{product.price?.toFixed(2) || "0.00"}
      </span>
      <span className='text-center w-1/5 font-semibold text-sm'>
        R{((product.price || 0) * (product.quantity || 0)).toFixed(2)}
      </span>

      {/* Delete Button */}
      <span
        className='text-center w-1/5 font-semibold text-sm cursor-pointer'
        onClick={handleDelete}>
        <RiDeleteBinLine className='text-2xl text-yellow-700 hover:text-black transition-colors duration-200' />
      </span>
    </div>
  );
};

export default MainCartCard;
