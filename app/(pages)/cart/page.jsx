/** @format */

import Cart from "@/app/components/Cart";
import axios from "axios";

async function getProducts() {
  try {
    const response = await axios.get(
      "api/cart?userId=679d0854631f81325321d575"
    );
    console.log(response.data);
    return response.data.items ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function simplifyProduct(product) {
  return {
    _id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
    outOfStock: product.outOfStock ?? false,
    category: product.category
      ? { _id: product.category, name: product.category }
      : null,
  };
}

export default async function ShopPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  const simplifiedProducts = products.map(simplifyProduct);
  return (
    <Cart
      products={simplifiedProducts.map((product) => ({
        ...product,
        description: product.description ?? "",
      }))}
    />
  );
}
