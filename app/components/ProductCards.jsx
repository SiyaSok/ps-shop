/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { BsShareFill } from "react-icons/bs";
import { TbSwitchHorizontal } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { usePathname } from "next/navigation";

const ProductCards = ({ products, markAsOutofStock }) => {
  const { addToCart, grid } = useCart();
  const [loadingProduct, setLoadingProduct] = useState(false);

  const pathname = usePathname();

  const handleAddToCart = async (id) => {
    setLoadingProduct(id);
    await addToCart(id);
    setLoadingProduct(null);
  };

  const isoutOfStock = async (id) => {
    setLoadingProduct(id);
    await markAsOutofStock(id);
    setLoadingProduct(null);
  };

  return (
    <div className='container mx-auto p-4'>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${grid} gap-8`}>
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className='border shadow-md relative group overflow-hidden'>
              <div className='relative aspect-[4/5] w-full  overflow-hidden'>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes='60%'
                  className='transition-opacity duration-300 group-hover:opacity-70'
                />
              </div>
              <div className='h-64 border-t'>
                <div className='p-4 '>
                  <h2 className='text-2xl font-semibold mb-1 text-gray-800 '>
                    {product.title}
                  </h2>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600 mb-2 line-clamp-3'>
                    {product.description}
                  </p>
                  <p className='text-lg font-semibold text-gray-800'>
                    R{parseInt(product.price).toFixed(2)}
                  </p>
                  {product.outOfStock && (
                    <div className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs w-14 h-14 flex items-center text-center'>
                      No Stock
                    </div>
                  )}
                </div>
              </div>

              <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50'>
                {pathname != "/outofstock" && !product.outOfStock ? (
                  <button
                    className='bg-white text-amber-400 hover:bg-black font-bold py-2 px-6  mr-2'
                    onClick={() => handleAddToCart(product._id)}>
                    {loadingProduct === product._id ? (
                      <div className='w-6 h-6 border-4 border-t-4 border-amber border-solid rounded-full animate-spin cursor-pointer'></div> // Tailwind spinner
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                ) : (
                  ""
                )}

                {pathname === "/outofstock" && !product.outOfStock ? (
                  <button
                    className='bg-black text-white hover:bg-amber-400 font-bold py-2 px-6  mr-2'
                    onClick={() => isoutOfStock(product._id)}>
                    {loadingProduct === product._id ? (
                      <div className='w-6 h-6 border-4 border-t-4 border-amber border-solid rounded-full animate-spin cursor-pointer'></div> // Tailwind spinner
                    ) : (
                      "out of stock"
                    )}
                  </button>
                ) : (
                  ""
                )}

                <div className='flex text-white w-full gap-2 items-center justify-evenly'>
                  <div className='flex gap-1 items-center'>
                    <BsShareFill className='text-3xl' />

                    <span className='text-base'>Share</span>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <TbSwitchHorizontal className='text-3xl' />
                    <span className='text-base'>Compare</span>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <CiHeart className='text-3xl' />
                    <span className='text-base'>like</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
