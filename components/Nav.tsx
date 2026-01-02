"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3 px-3 bg-card border-b border-border">
      {/* Logo */}
      <Link href="/" className="flex gap-2 flex-center items-center ml-25">
        <Image
          src="/assets/icons/logo.jpg"
          alt="Promptopia Logo"
          width={50}
          height={50}
          className="object-contain bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500"
        />
        <p className="max-sm:hidden font-satoshi font-semibold text-lg text-fg tracking-wide ">
           PromptVerse
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden gap-5 md:gap-5 items-center mr-5">
        <ThemeToggle />

        {session?.user ? (
          <>
            <Link
              href="/create-prompt"
              className="rounded-full border border-border bg-card py-1.5 px-5 text-fg transition-all hover:opacity-95 text-center text-sm font-inter flex items-center justify-center"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-border bg-card py-1.5 px-5 text-fg transition-all hover:opacity-95 text-center text-sm font-inter flex items-center justify-center"
            >
              Sign Out
            </button>
            <Link href="/profile" className="flex items-center justify-center">
              <Image
                src={session?.user?.image || "/assets/icons/logo.jpg"}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full object-contain"
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full border border-border bg-card py-1.5 px-5 text-fg transition-all hover:opacity-95 text-center text-sm font-inter flex items-center justify-center"
            >
              Sign In
            </Link>
            {/* <Link
              href="/signup"
              className="rounded-full border border-border bg-transparent py-1.5 px-5 text-fg transition-all hover:bg-card hover:text-fg text-center text-sm font-inter flex items-center justify-center"
            >
              Sign Up
            </Link> */}
          </>
        )}
      </div>

      {/* Mobile Navigation - FIXED */}
      <div className="sm:hidden flex relative items-center gap-2">
        <div className="text-sm font-inter text-fg tracking-wide flex items-center justify-center">
          <ThemeToggle />
        </div>
        {session?.user ? (
          <div className="flex relative">
            <Image
              src={session?.user.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full object-contain cursor-pointer"
              alt="Profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="absolute right-0 top-full mt-3 w-48 p-5 rounded-lg bg-card shadow-xl border border-border z-50 flex flex-col gap-3">
                <Link
                  href="/profile"
                  className="text-sm font-inter text-fg hover:text-primary font-medium py-2"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-sm font-inter text-fg hover:text-primary font-medium py-2"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full rounded-full border border-border bg-card py-2 px-4 text-fg transition-all hover:opacity-95 text-center text-sm font-inter"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-full border border-border bg-card py-2 px-4 text-fg text-xs transition-all hover:opacity-95 flex items-center justify-center"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full border-2 border-border bg-transparent py-2 px-4 text-fg text-xs font-medium transition-all hover:bg-card hover:text-fg flex items-center justify-center"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
