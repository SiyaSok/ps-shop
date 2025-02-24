/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/public/images/logo.webp";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useCart } from "@/app/Context/CartContext"; // Adjust the path accordingly
import { IoIosCloseCircle } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(false);
  const [isMoblieMenuOpen, setIsMoblieMenuOpen] = useState(false);
  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false);

  const [providers, setProviders] = useState(null);

  const [error, setError] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const { cartItems, fetchCart, deleteItem, isRegister } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const setAuthProvider = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    setAuthProvider();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearchOpen(false);
    router.push(`/search?Keywords=${encodeURIComponent(searchTerm)}`);
  };

  const handleDelete = async (productId) => {
    setDeletingItemId(productId);
    try {
      await deleteItem(productId);
    } catch (error) {
      setError("Error removing item. Please try again.", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  return (
    <nav className='bg-white border-b border-grey relative'>
      <div className='mx-auto container px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className=' inset-y-0 right-0 flex items-center md:hidden'>
            {/* <!-- Mobile menu button--> */}
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black
               hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setIsMoblieMenuOpen((prev) => !prev)}>
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
          <Link className='flex items-center' href='/'>
            <Image className='h-10 w-auto' src={logo} alt='PropertyPulse' />
          </Link>

          <div className='hidden md:flex space-x-4'>
            {["Home", "Products", "About", "Contact", "OutofStock"].map(
              (name) => {
                const path =
                  name.toLowerCase() === "home"
                    ? "/"
                    : `/${name.toLowerCase()}`;
                return (
                  <Link
                    key={name}
                    href={path}
                    className={`${
                      pathname === path ? "bg-black text-white" : ""
                    }  ${
                      path === "/outofstock" && !session ? "hidden" : ""
                    } text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
                    {name}
                  </Link>
                );
              }
            )}
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
          <div className='flex items-center gap-4 '>
            {!session && (
              <div className='hidden md:block md:ml-6'>
                <div className='flex items-center'>
                  {providers &&
                    Object.values(providers).map((provider, index) => (
                      <button
                        key={index}
                        onClick={() => signIn(provider.id)}
                        className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                        {/* <i className='fa-brands fa-google text-white mr-2'></i> */}
                        <FaGoogle className='text=white mr-2' />
                        <span>Login or Register</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
            <button
              type='button'
              onClick={() => setIsSearchOpen((prev) => !prev)}>
              <IoSearchOutline className='text-3xl hidden md:flex' />
            </button>
            {/* <CiHeart className={`text-3xl  ${!session ? "hidden" : "flex"} `} /> */}

            <div className='mt-1'>
              {session && (
                <button
                  type='button'
                  className=''
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'
                  onClick={() => setisProfileMenuOpen((prev) => !prev)}>
                  <Image
                    className='h-8 w-8 rounded-full'
                    src={`${session?.user?.image}`}
                    alt='profileDefault'
                    height={50}
                    width={50}
                  />
                </button>
              )}
            </div>

            <div
              className='relative'
              onMouseEnter={
                cartItems?.length > 0 ? () => setIsCartOpen(true) : undefined
              }>
              <MdOutlineShoppingCart className='text-3xl cursor-pointer' />
              {cartItems?.length > 0 && (
                <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2'>
                  {cartItems?.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      {isSearchOpen && (
        <div className='fixed top-20 right-0 bg-white/80 z-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg shadow-md'>
            <input
              type='text'
              ref={searchInputRef}
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
              onClick={submitSearch}>
              Search
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal with Animation */}
      {isCartOpen && cartItems && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black/50 z-40 flex justify-end'
          onClick={(e) => {
            if (e.target.id === "cart-backdrop") {
              setIsCartOpen(false);
            }
          }}
          id='cart-backdrop'>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className='absolute h-full right-0 w-[330px]  md:w-[380px] bg-white shadow-lg py-4 px-8 z-50'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold border-b py-4'>
                Shopping Cart
              </h2>
              <HiOutlineLockClosed className='text-2xl text-grey mr-4' />
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}

            {cartItems.length > 0 ? (
              <ul className='h-9/10 overflow-y-auto min-w-sm'>
                {cartItems.map((item) => (
                  <li
                    key={item.productId}
                    className='flex items-center w-full py-2 gap-4 relative'>
                    {deletingItemId === item.productId && (
                      <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm'>
                        Removing...
                      </div>
                    )}
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      a
                      height={80}
                      className='rounded'
                    />
                    <div className='flex-grow  min-w-sm'>
                      <p className='text-sm font-medium'>{item.title}</p>
                      <p className='text-xs text-gray-700 mt-2'>
                        {item.quantity} <span className='italic'>X</span>{" "}
                        <span className='text-yellow-700'>
                          R {item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.productId)}
                      className='text-gray-500 hover:text-red-700'>
                      <IoIosCloseCircle className='text-2xl' />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-xs text-gray-500'>Cart is empty</p>
            )}
            <div className=' w-full absolute bottom-4 right-0 py-2 '>
              <div className='flex text-black w-full gap-2 items-center  mt-2 w-full py-8 px-6 border-b'>
                <div className='flex gap-1 items-center w-1/2'>Subtotal</div>
                <div className='flex gap-1 items-center w-1/2 text-yellow-700'>
                  R {calculateTotal()?.toFixed(2)}
                </div>
              </div>
              <div className='flex text-white w-full gap-2 items-center justify-evenly mt-2 w-full py-4'>
                <div className='flex gap-1 items-center'>
                  <button className='text-black border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white  md:w-full'>
                    <Link href='/cart'>Cart</Link>
                  </button>
                </div>
                <div className='flex gap-1 items-center'>
                  <button className='text-black border border-black rounded-full px-4 py-2  hover:bg-black hover:text-white md:w-full'>
                    <Link href='/cart'>Compare</Link>
                  </button>
                </div>
                <div className='flex gap-1 items-center'>
                  <button className='text-black border border-black rounded-full px-4 py-2  hover:bg-black hover:text-white  md:w-full'>
                    <Link href='/cart'>checkout</Link>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {isMoblieMenuOpen && (
        <div id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2 flex flex-col border-b'>
            {["Home", "Products", "About", "Contact", "OutofStock"].map(
              (name) => {
                const path =
                  name.toLowerCase() === "home"
                    ? "/"
                    : `/${name.toLowerCase()}`;
                return (
                  <Link
                    key={name}
                    href={path}
                    className={`${
                      pathname === path ? "bg-black text-white" : ""
                    } ${
                      path === "/outofstock" && !session ? "hidden" : ""
                    }  text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
                    {name}
                  </Link>
                );
              }
            )}
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
      )}

      {isProfileMenuOpen && (
        <div
          id='user-menu'
          className=' absolute right-[172px] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu-button'
          tabIndex='-1'>
          <Link
            href='/profile'
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'
            tabIndex='-1'
            id='user-menu-item-0'>
            Your Profile
          </Link>
          <Link
            href='/properties/saved'
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'
            tabIndex='-1'
            id='user-menu-item-2'>
            Saved Properties
          </Link>
          <button
            className='block px-4 py-2 text-sm text-gray-700'
            onClick={() => {
              setisProfileMenuOpen(false);
              signOut();
            }}
            role='menuitem'
            tabIndex='-1'
            id='user-menu-item-2'>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
