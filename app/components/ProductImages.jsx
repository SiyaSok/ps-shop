/** @format */

import Image from "next/image";

const ProductImages = ({ prod }) => {
  return (
    <>
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
    </>
  );
};

export default ProductImages;
