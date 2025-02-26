/** @format */

import { useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const GoogleLogInButton = ({ providers, signIn }) => {
  const { data: session } = useSession;

  return (
    !session && (
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
    )
  );
};

export default GoogleLogInButton;
