/** @format */

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.webp";

const NavLogo = () => {
  return (
    <Link className='flex items-center' href='/'>
      <Image className='h-10 w-auto' src={logo} alt='PropertyPulse' />
    </Link>
  );
};

export default NavLogo;
