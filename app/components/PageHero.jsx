/** @format */
"use client";
import CoverIamge from "@/public/images/herocover.webp";
import { MdArrowForwardIos } from "react-icons/md";

const PageHero = ({ catName }) => {
  return (
    <section
      className='relative h-[200px] md:h-[400px] bg-cover bg-center '
      style={{ backgroundImage: `url(${CoverIamge.src})` }}>
      <div>
        <div className=''>
          <div className='absolute top-0 left-0 w-full h-full  flex items-center justify-center'>
            <div className='text-center text-black'>
              <h1 className='text-2xl md:text-6xl font-semibold mb-4 text-black'>
                {catName ? catName : "Product"}
              </h1>
              <p className='text-lg md:text-xl mb-8 flex items-center justify-center gap-4'>
                <span className='font-semibold'>Home</span>{" "}
                <MdArrowForwardIos /> Product{" "}
                {catName && (
                  <>
                    {" "}
                    <MdArrowForwardIos />
                    <span className='font-semibold'>{catName}</span>{" "}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
