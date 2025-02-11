/** @format */
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/Funiro.webp";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white mt-8 text-black py-10  border-t border-gray-100'>
      <div className='container mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          <div>
            <Image src={logo} alt='Funiro logo' width={100} height={30} />
            <p className='my-8 text-gray-600'>
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-3'>Support</h4>
            <ul className=''>
              <li className='mt-8'>
                <a href='#' className=' text-gray-600 hover:underline'>
                  Help Center
                </a>
              </li>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  FAQs
                </Link>
              </li>
              <li className='mt-8'>
                <Link href='#' className=' text-gray-600 hover:underline'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-3'>Legal</h4>
            <ul className=''>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  Privacy Policy
                </Link>
              </li>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  Terms of Service
                </Link>
              </li>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-3'>Social</h4>
            <ul className=''>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  Facebook
                </Link>
              </li>
              <li className='mt-8'>
                <Link href='#' className=' text-gray-600  hover:underline'>
                  Twitter
                </Link>
              </li>
              <li className='mt-8'>
                <Link href='#' className='text-gray-600 hover:underline'>
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-3'>Newsletter</h4>
            <p className='mb-2 text-sm text-gray-600 mt-8'>
              Subscribe to our newsletter for updates.
            </p>
            <form>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full p-2 rounded bg-gray-800 text-white focus:outline-none'
              />
              <button className='mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className='text-center text-sm mt-6 border-t border-gray-100 pt-4'>
          &copy;{currentYear} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
