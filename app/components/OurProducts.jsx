/** @format */

import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./ProductCards";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  function simplifyProduct(product) {
    return {
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      outOfStock: product.outOfStock,
      category: product.category
        ? { _id: product.category._id, name: product.category.name }
        : null,
    };
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/products?limit=8");
        console.log(response);
        setProducts(response.data);
      } catch (err) {
        setError(err.message); // Set the error message
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const simplifiedProducts = products.map(simplifyProduct);

  return <Product products={simplifiedProducts} />;
};

export default OurProducts;
