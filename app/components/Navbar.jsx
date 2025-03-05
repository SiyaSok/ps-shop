/** @format */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useCart } from "@/app/Context/CartContext"; // Adjust the path accordingly
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import CartSlider from "@/app/components/CartSlider";
import NavbarLink from "@/app/components/NavbarLink";
import ProfileMenu from "@/app/components/ProfileMenu";
import GoogleLogInButton from "@/app/components/GoogleLogInButton";
import ProfileImage from "@/app/components/ProfileImage";
import NavLogo from "@/app/components/NavLogo";

const Navbar = () => {
  const { data: session } = useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMoblieMenuOpen, setIsMoblieMenuOpen] = useState(false);
  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  const { cartItems, fetchCart } = useCart();

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

  return (
    <nav className='bg-white border-b border-grey relative sticky top-0 z-10'>
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
          <NavLogo />
          <NavbarLink />
          <div className='flex items-center gap-4 '>
            <GoogleLogInButton providers={providers} signIn={signIn} />
            <button
              type='button'
              onClick={() => setIsSearchOpen((prev) => !prev)}>
              <IoSearchOutline className='text-3xl hidden md:flex' />
            </button>

            <ProfileImage setisProfileMenuOpen={setisProfileMenuOpen} />
            <div
              className='relative'
              onMouseEnter={
                cartItems?.length > 0 ? () => setIsCartOpen(true) : undefined
              }>
              <MdOutlineShoppingCart className='text-3xl cursor-pointer' />
              {cartItems?.length > 0 && (
                <span
                  className='absolute top-0 right-0 inline-flex text-xs items-center justify-center
     px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full'>
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

      {isCartOpen && cartItems && <CartSlider setIsCartOpen={setIsCartOpen} />}

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
        <ProfileMenu
          setisProfileMenuOpen={setisProfileMenuOpen}
          signOut={signOut}
        />
      )}
    </nav>
  );
};

export default Navbar;
