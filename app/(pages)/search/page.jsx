/** @format */

"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProductCards from "@/app/components/ProductCards";

function ProductList() {
  const searchParams = useSearchParams();
  const Keywords = searchParams.get("Keywords") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `/api/products?Keywords=${encodeURIComponent(Keywords)}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        setProducts(await res.json());
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [Keywords]);

  if (!products.length) {
    return <div>No products found.</div>;
  }

  return <ProductCards products={products} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductList />
    </Suspense>
  );
}
