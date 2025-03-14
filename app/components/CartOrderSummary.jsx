/** @format */

const CartOrderSummary = ({ products }) => {
  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div id='summary' className='w-1/4 px-8 py-10'>
      <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
      <div className='flex justify-between mt-10 mb-5'>
        <span className='font-semibold text-sm uppercase'>
          Items {products.length}
        </span>
        <span className='font-semibold text-sm'>R {calculateTotal()}</span>
      </div>
      <div>
        <label className='font-medium inline-block mb-3 text-sm uppercase'>
          Shipping
        </label>
        <select className='block p-2 text-gray-600 w-full text-sm'>
          <option>Standard shipping - R70.00</option>
        </select>
      </div>
      <div className='py-10'>
        <label
          htmlFor='promo'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Promo Code
        </label>
        <input
          type='text'
          id='promo'
          placeholder='Enter your code'
          className='p-2 text-sm w-full'
        />
      </div>
      <button className='bg-black hover:bg-yellow-500 px-5 py-2 text-sm text-white uppercase'>
        Apply
      </button>
      <div className='border-t mt-8'>
        <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
          <span>Total cost</span>
          <span>R{calculateTotal() + 70}</span>
        </div>
        <button className='bg-black font-semibold hover:bg-yellow-500 py-3 text-sm text-white uppercase w-full'>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartOrderSummary;
