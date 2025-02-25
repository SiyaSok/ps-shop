/** @format */

import Image from "next/image";
import Link from "next/link";

const FeaturedProductCard = ({ product }) => {
  return (
    <div>
      <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row h-80  w-full overflow-hidden'>
        <div className='flex flex-col items-center  rounded-lg shadow-sm md:flex-row '>
          <Link href={`/products/${product.id}`}>
            <Image
              className='object-cover w-full rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-s-lg'
              src={product.image}
              alt=''
              height={200}
              width={400}
            />
          </Link>
          <div className='flex flex-col justify-between p-4 leading-normal'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-black '>
              {product.title}
            </h5>
            <p className='mb-3 font-normal text-black'>{product.description}</p>
            <h3 className='text-xl text-black font-bold'>
              R{product.price.toFixed(2)}
            </h3>
            <div className='mt-4'>
              <Link
                href={`/products/${product._id}`}
                className='bg-white text-black border border-black hover:text-white hover:bg-black font-bold py-2 px-6  mr-2'>
                View More
              </Link>
              {!product.outOfStock ? (
                <button className='bg-white text-black border border-black hover:text-white hover:bg-black font-bold py-2 px-6  mr-2'>
                  Add to Cart
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
