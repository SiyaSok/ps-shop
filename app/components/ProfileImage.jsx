/** @format */

import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileImage = ({ setisProfileMenuOpen }) => {
  const { data: session } = useSession();
  return (
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
  );
};

export default ProfileImage;
