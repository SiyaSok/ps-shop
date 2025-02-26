/** @format */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../Context/CartContext";
import { useSession } from "next-auth/react";

const NavbarLink = () => {
  const pathname = usePathname();
  const { isRegister } = useCart();
  const { data: session } = useSession();

  return (
    <div className='hidden md:flex space-x-4'>
      {["Home", "Products", "About", "Contact", "OutofStock"].map((name) => {
        const path =
          name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`;
        return (
          <Link
            key={name}
            href={path}
            className={`${pathname === path ? "bg-black text-white" : ""}  ${
              path === "/outofstock" && !session ? "hidden" : ""
            } text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
            {name}
          </Link>
        );
      })}
      {isRegister && (
        <div>
          <Link
            key='product'
            href='/add-product'
            className={`${
              pathname === "add-product" ? "bg-black text-white" : ""
            } text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
            add product
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarLink;
