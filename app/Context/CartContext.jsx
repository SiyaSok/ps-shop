/** @format */

"use client";

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = "679d0854631f81325321d575";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/cart?userId=${userId}`);

      if (response.data && response.data.items) {
        setCartItems(response.data.items);
        setCartId(response.data._id);
        setCartTotal(response.data.totalPrice || 0);
      } else {
        setCartItems([]);
        setCartId(null);
        setCartTotal(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: {
            productId: id,
            quantity: 1,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      setCartItems(data.items);
      setCartId(data._id);
      setCartTotal(data.totalPrice);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage(error.message || "Error adding to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/cart/product/${id}?cartItemId=${cartId}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      setCartItems(data.cart.items);
      setCartTotal(data.cart.totalPrice);
      console.log(data);
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage(error.message || "Error deleting item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isRegister ? "/api/users" : "/api/login";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(response.data.message || "Success!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        fetchCart,
        deleteItem,
        cartTotal,
        formData,
        setIsRegister,
        handleChange,
        handleSubmit,
        message,
        userId,
        isRegister,
        loading,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export { CartContext };
