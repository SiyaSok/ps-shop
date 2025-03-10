/** @format */
"use client";
// import { useState } from "react";
import MainCartCard from "@/app/components/MainCartCard";
import CartOrderSummary from "@/app/components/CartOrderSummary";
const MainCart = ({ products, cart }) => {
  // const [cart, setCart] = useState([]);

  // const removeFromCart = (productToRemove) => {
  //   setCart(cart.filter((product) => product._id !== productToRemove._id));
  // };

  const addToCart = async (product) => {
    try {
      const userId = "679db65928ba7710611593d9";
      const existingItem = cart.find((item) => item.productId === product._id);

      const updatedItems = existingItem
        ? cart.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { productId: product._id, quantity: 1 }];

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: updatedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data.items);
      localStorage.setItem("Cart", JSON.stringify(data.items));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Please try again.");
    }
  };

  return (
    <div className='container mx-auto mt-10'>
      <div className='flex shadow-md my-10'>
        <div className='w-3/4 bg-white px-10 py-10'>
          <div className='flex justify-between border-b pb-8'>
            <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
            <h2 className='font-semibold text-2xl'>{products.length} Items</h2>
          </div>
          <div className='flex mt-10 mb-5'>
            <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
              Product Details
            </h3>
            <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'>
              Quantity
            </h3>
            <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'>
              Price
            </h3>
            <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'>
              Total
            </h3>
            <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center'></h3>
          </div>

          {products.map((product) => (
            <MainCartCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              cart={cart}
            />
          ))}

          <a href='#' className='flex font-semibold text-black text-sm mt-10'>
            <svg
              className='fill-current mr-2 text-black w-4'
              viewBox='0 0 448 512'>
              <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
            </svg>
            Continue Shopping
          </a>
        </div>

        <CartOrderSummary products={products} />
      </div>
    </div>
  );
};

export default MainCart;
