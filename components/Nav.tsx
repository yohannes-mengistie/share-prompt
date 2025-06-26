"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown,setToggleDropDown] = useState(false);


  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []); 

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3 px-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="max-sm:hidden font-satoshi font-semibold text-lg text-black tracking-wide">
          Promptopia
        </p>
      </Link> 

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
            >
              Sign Out
            </button>
            <Link href="/profile" className="flex items-center justify-center">
              <Image
                src={session?.user?.image || "/assets/images/logo.svg" }
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full object-contain"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type ='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image 
              src={ session?.user.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full object-contain"
              alt="Profile" 
              onClick={() => setToggleDropDown((prev) => !prev) }
              />
              {toggleDropDown && (
                <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                  <Link href='/profile'
                   className ='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                   onClick ={() => setToggleDropDown(false)}
                   >
                    My Profile
                  </Link>
                  <Link href='/create-prompt'
                   className ='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                   onClick ={() => setToggleDropDown(false)}
                   >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                    className=" mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center">
                      Sign Out
                    </button>

                </div>
              )}
            </div>
          ):(
            <>  
             {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type ='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign In
                </button>
              ))}
            </>
          )}
        </div>

    </nav>
  );
};

export default Nav;