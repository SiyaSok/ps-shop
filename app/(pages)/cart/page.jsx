/** @format */

import connectDB from "@/lib/db";
import { getSessionUser } from "@/lib/getSessionUser";
import MainCart from "@/app/components/MainCart";
import Cart from "@/lib/modals/cart";
import ProductPageFooter from "@/app/components/ProductPageFooter";
export default async function ShopPage() {
  await connectDB();

  const sessionUser = await getSessionUser();
  // if (!sessionUser || !sessionUser.userId) {
  //   throw new Error("user ID is required");
  // }

  const cart = await Cart.find({ user: sessionUser.userId }).lean();

  if (cart[0].items === 0) {
    return <div>No products found.</div>;
  }
  return (
    <>
      <MainCart
        products={JSON.parse(JSON.stringify(cart[0].items))}
        cart={JSON.parse(JSON.stringify(cart))}
      />
      <ProductPageFooter />
    </>
  );
}
