/** @format */
"use client";
import PageHero from "@/app/components/PageHero";
import ProductCards from "@/app/components/ProductCards";
import ProductPageFooter from "@/app/components/ProductPageFooter";
import SortFilter from "@/app/components/SortFilter";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState();
  const [filteredCategory, setFilteredCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

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
        const url = filteredCategory
          ? `/api/products/category/${filteredCategory}?limit=${limit}&sortBy=${selectedCategory}&sortOrder=${sortOrder}`
          : `/api/products?limit=${limit}&sortBy=${selectedCategory}&sortOrder=${sortOrder}`;

        const response = await axios.get(url);
        setProducts(response.data);
        setProductsTotal(response.data.length);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [limit, selectedCategory, sortOrder, filteredCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const simplifiedProducts = products.map(simplifyProduct);

  const handleLimitChange = (newLimit) => setLimit(newLimit);
  const handleSortChange = (newSort) => {
    if (newSort === "highToLow") {
      setSortOrder(-1);
      setSelectedCategory("price");
    } else {
      setSelectedCategory(newSort);
      setSortOrder(1);
    }
  };

  const handleCategoryChange = (categoryId) => setFilteredCategory(categoryId);

  return (
    <>
      <PageHero />
      <SortFilter
        onLimitChange={handleLimitChange}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        limit={limit}
        productsTotal={productsTotal}
        filteredCategory={filteredCategory}
      />
      <ProductCards products={simplifiedProducts} />
      <ProductPageFooter />
    </>
  );
};

export default Page;
