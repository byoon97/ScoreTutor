"use client";
import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Nav() {
  const { user } = useUser();

  return (
    <div className="sticky top-0 bg-black z-10 text-white -mx-2 px-4 shadow-xl py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu size={25} fontSize={"1.5em"} />
          <Image src="/image.png" alt="logo" width="100" height="100" />
        </div>
        <div className="flex flex-row items-center">
          {user ? (
            <Link
              href="/api/auth/logout"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              <CgProfile size={"1em"} fontSize={"1.5em"} />{" "}
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
