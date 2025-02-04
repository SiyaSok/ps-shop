/** @format */

import CoverIamge from "@/public/images/hero.webp";
const Hero = () => {
  return (
    <section
      className='relative h-[500px] md:h-[600px] bg-cover bg-center'
      style={{ backgroundImage: `url(${CoverIamge.src})` }}>
      <div>
        <div className=''>
          <div className='absolute top-0 left-0 w-full h-full  flex items-center justify-center'>
            <div className='text-center text-white'>
              <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                Your Hero Title
              </h1>
              <p className='text-lg md:text-xl mb-8'>
                A brief and compelling description.
              </p>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg'>
                Learn More
              </button>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none'></div>
        </div>

        <div className='container mx-auto p-4'></div>
      </div>
    </section>
  );
};

export default Hero;
