/** @format */

import Image from "next/image";
import Link from "next/link";
import Dining from "@/public/images/Dining.webp";
import Living from "@/public/images/living.webp";
import Bedroom from "@/public/images/Bedroom.webp";

const Range = () => {
  const categories = [
    {
      image: Dining,
      alt: "Dining Room",
      title: "Dining Room",
      href: "/products",
    },
    {
      image: Living,
      alt: "Living Room",
      title: "Living Room",
      href: "/products",
    },
    {
      image: Bedroom,
      alt: "Bedroom",
      title: "Bedroom",
      href: "/products",
    },
  ];

  return (
    <section className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {categories.map((category) => (
          <div
            key={category.title}
            className='bg-white rounded-lg overflow-hidden   transition duration-300'>
            <Link href={category.href} className='block'>
              <div className='relative'>
                <Image
                  src={category.image.src}
                  alt={category.alt}
                  width={500}
                  height={300}
                  className='object-cover rounded-t-lg'
                  priority
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300 flex items-center justify-center'></div>
              </div>
              <div className='p-4 text-center'>
                <h2 className='text-xl font-semibold'>{category.title}</h2>{" "}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Range;
