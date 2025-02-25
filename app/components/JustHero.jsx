/** @format */

import CoverIamge from "@/public/images/FuniroFurniture.webp";
const JustHero = () => {
  return (
    <section
      className='relative h-[500px] md:h-[600px] bg-cover bg-center'
      style={{ backgroundImage: `url(${CoverIamge.src})` }}>
      <div>
        <div className=''>
          <div className='absolute top-0 right-0 md:right-[18%] w-full h-full flex items-center justify-end p-4 md:p-0'>
            {/* <div className='text-start text-white bg-orange-100 p-6 w-full md:w-1/3'>
              <p className='text-black'>New Arrival</p>
              <h1 className='text-4xl md:text-6xl font-bold mb-4 text-yellow-700'>
                Discover Our
                <br /> New Collection
              </h1>
              <p className='text-lg text-black md:text-xl mb-8'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
              <button className='bg-blue-500 hover:bg-black text-white font-bold py-3 px-8 bg-yellow-700'>
                <Link href='/products'>BUY Now</Link>
              </button>
            </div> */}
          </div>
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none'></div>
        </div>
        <div className='container mx-auto p-4'></div>
      </div>
    </section>
  );
};

export default JustHero;
