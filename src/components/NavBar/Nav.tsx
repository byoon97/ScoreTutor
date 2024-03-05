"use client";
import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Span } from "next/dist/trace";

export default function Nav() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { user } = useUser();

  return (
    <div className="sticky top-0 bg-black z-10 text-white px-4 shadow-xl py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu size={25} fontSize={"1.5em"} />
          <Image src="/image.png" alt="logo" width="100" height="100" />
        </div>
        <div
          className="flex flex-row items-center"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <CgProfile size={"1em"} fontSize={"1.5em"} />
        </div>
      </div>
      {openMenu ? (
        <div className="flex flex-col font-inter text-sm -mx-4 pt-2">
          <div className="py-2 pl-4 border-t-[1px] border-[#31383D] text-[#656667]">
            {user ? (
              <Link href="/api/auth/logout">
                <span>Sign Out</span>
              </Link>
            ) : (
              <Link href="/api/auth/login">
                <span>Log In</span>
              </Link>
            )}
          </div>

          <Link href="/join">
            <div className="pt-2 pb-1 pl-4 border-t-[1px] border-[#31383D] text-[#77D2EF]">
              Become a Member
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
