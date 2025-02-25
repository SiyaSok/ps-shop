/** @format */

export function simplifyProduct(product) {
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

// JSON.parse(JSON.stringify(sampleData));
