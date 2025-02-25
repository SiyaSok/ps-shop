/** @format */

const ProductDetails = ({ prod }) => {
  return (
    <div className='flex flex-col justify-between p-4 space-y-2 md:w-1/2'>
      {" "}
      {/* Added width for larger screens */}
      <div>
        <h1 className='text-4xl font-semibold'>{prod.title}</h1>
        <p className='text-3xl text-gray-600 mt-4'>
          R {parseInt(prod.price).toFixed(2)}
        </p>
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
  );
};

export default ProductDetails;
