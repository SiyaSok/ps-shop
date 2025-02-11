/** @format */
// import connectDB from "@/lib/db";
// import Product from "@/lib/modals/products";
// import Products from "./Products";

const ProductPageProducts = async () => {
  // await connectDB();

  // const recentProduct = await Product.find({})
  //   .sort({ createdAt: -1 }) // Corrected typo: createAT to createdAt
  //   .limit(4)
  //   .lean();

  // // More efficient simplification using projection in the query
  // const simplifiedProducts = recentProduct.map((product) => ({
  //   _id: product._id,
  //   title: product.title,
  //   description: product.description,
  //   price: product.price,
  //   image: product.image,
  //   outOfStock: product.outOfStock,
  //   category: product.category
  //     ? { _id: product.category._id, name: product.category.name }
  //     : null,
  // }));

  return (
    <>
      Products
      {/* <Products products={simplifiedProducts} /> */}
    </>
  );
};

export default ProductPageProducts;
