"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { useUser } from "@/app/context/UserContext/userStore";

const menuItemContainer = "flex flex-row items-center p-4 cursor-pointer";
const menuItem = "font-thin pl-2";

export default function Nav() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openHamMenu, setOpenHamMenu] = React.useState(false);
  const { user, isLoading, error, isSignedIn } = useUser();

  return (
    <div className="sticky top-0 bg-black z-10 text-white px-4 shadow-xl py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu
            size={25}
            fontSize={"1.5em"}
            onClick={() => setOpenHamMenu(!openHamMenu)}
          />
          <Link href="/">
            <Image
              src="/image.png"
              alt="logo"
              width="100"
              height="100"
              className="pointer"
            />
          </Link>
        </div>

        <div
          className="flex flex-row items-center"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <CgProfile size={"1em"} fontSize={"1.5em"} />
        </div>
      </div>{" "}
      {openHamMenu && (
        <div className="absolute w-56 bg-black text-white z-10 -mx-4">
          {!isSignedIn ? (
            <Link
              href="/api/auth/login"
              onClick={() => setOpenHamMenu(!openHamMenu)}
            >
              <div className={menuItemContainer}>
                <FaSignInAlt size={20} />
                <div className={menuItem}>Sign In</div>
              </div>
            </Link>
          ) : (
            <Link
              href="/api/auth/logout"
              onClick={() => setOpenHamMenu(!openHamMenu)}
            >
              <div className={menuItemContainer}>
                <FaSignInAlt size={20} />
                <div className={menuItem}>Sign Out</div>
              </div>
            </Link>
          )}

          {isSignedIn ? (
            <Link
              onClick={() => setOpenHamMenu(!openHamMenu)}
              href={`/profile/${user?.firstName}_${user?.lastName}`}
            >
              {" "}
              <div className={menuItemContainer}>
                <CgProfile size={20} />
                <div className={menuItem}>Profile</div>
              </div>
            </Link>
          ) : null}

          <Link href="/join" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <MdCardMembership size={20} />
              <div className={menuItem}>Membership</div>
            </div>
          </Link>

          <div className="border-b-[1px] border-[#5A5A5A]"></div>
          <Link href="/picks" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <CiBoxList size={20} />
              <div className={menuItem}>Picks</div>
            </div>
          </Link>

          <Link href="/calendar" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <CiCalendar size={20} />
              <div className={menuItem}>Pick History</div>
            </div>
          </Link>

          <div className="border-b-[1px] border-[#5A5A5A]"></div>
          <Link href="/about" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <FcAbout size={20} />
              <div className={menuItem}>What we Do</div>
            </div>
          </Link>

          <div className="border-b-[1px] border-[#5A5A5A]"></div>
        </div>
      )}
      {openMenu ? (
        <div className="flex flex-col font-inter text-sm pt-2">
          <div className="py-2 pl-4 border-t-[1px] border-[#31383D] text-[#656667]">
            {isSignedIn ? (
              <Link
                href="/api/auth/logout"
                onClick={() => setOpenHamMenu(!openHamMenu)}
              >
                <span>Sign Out</span>
              </Link>
            ) : (
              <Link
                href="/api/auth/login"
                onClick={() => setOpenHamMenu(!openHamMenu)}
              >
                <span>Log In</span>
              </Link>
            )}
          </div>

          <Link href="/join" onClick={() => setOpenHamMenu(!openHamMenu)}>
            <div className="pt-2 pb-1 pl-4 border-t-[1px] border-[#31383D] text-[#77D2EF]">
              Become a Member
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
