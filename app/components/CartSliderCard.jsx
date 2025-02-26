/** @format */

import Image from "next/image";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useCart } from "../Context/CartContext";

const CartSliderCard = ({ cartItems }) => {
  const [deletingItemId, setDeletingItemId] = useState(false);
  const { deleteItem } = useCart();

  const handleDelete = async (productId) => {
    setDeletingItemId(productId);
    try {
      await deleteItem(productId);
    } catch (error) {
      setError("Error removing item. Please try again.", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  return cartItems.length > 0 ? (
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
              <span className='text-yellow-700'>R {item.price.toFixed(2)}</span>
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
  );
};

export default CartSliderCard;
