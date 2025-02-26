/** @format */

import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const MobileNavbar = () => {
  return (
    <div id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col border-b'>
        {["Home", "Products", "About", "Contact", "OutofStock"].map((name) => {
          const path =
            name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`;
          return (
            <Link
              key={name}
              href={path}
              className={`${pathname === path ? "bg-black text-white" : ""} ${
                path === "/outofstock" && !session ? "hidden" : ""
              }  text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
              {name}
            </Link>
          );
        })}
      </div>
      <div
        className='space-y-1 px-2 pb-3 pt-2 flex flex-col border-top'
        onClick={() => setIsSearchOpen((prev) => !prev)}>
        <div className='px-3 py-2 flex  gap-4 items-center justify-between '>
          Search
          <IoSearchOutline className='text-2xl' />
        </div>
      </div>
      <div
        className={`space-y-1 px-2 pb-3 pt-2 flex flex-col border-top ${
          !session ? "hidden" : ""
        } `}
        onClick={() => setIsSearchOpen((prev) => !prev)}>
        <div className='px-3 py-2 flex  gap-4 items-center justify-between '>
          Wish List
          <CiHeart className='text-2xl ' />
        </div>
      </div>
      <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col border-top'>
        {!session && (
          <div className='md:ml-6'>
            <div className='flex items-center'>
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    onClick={() => signIn(provider.id)}
                    className='flex items-center text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                    {/* <i className='fa-brands fa-google text-white mr-2'></i> */}
                    <FaGoogle className='text=white mr-2' />
                    <span>Login or Register</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
