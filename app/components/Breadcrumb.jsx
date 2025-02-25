/** @format */

import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const Breadcrumb = ({ prod }) => {
  return (
    <section className='bg-orange-100 p-4'>
      <div className='container mx-auto flex flex-col md:flex-row items-center gap-4 md:justify-between py-4'>
        <p className='text-lg md:text-xl flex items-center justify-center gap-4'>
          <Link className='font-semibold cursor-pointer' href='/'>
            Home
          </Link>{" "}
          <MdArrowForwardIos />
          <Link className='font-semibold cursor-pointer' href='/products'>
            Products
          </Link>
          <MdArrowForwardIos />
          {" |"}
          <span className=''>{prod.title}</span>
        </p>
      </div>
    </section>
  );
};

export default Breadcrumb;
