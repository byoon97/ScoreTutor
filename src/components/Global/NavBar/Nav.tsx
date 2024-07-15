"use client";
import Image from "next/image";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { FiTool } from "react-icons/fi";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { useUser } from "@/app/context/UserContext/userStore";

const menuItemContainer = "flex flex-row items-center p-4 cursor-pointer";
const menuItem = "font-thin pl-2";
const line = "border-b-[1px] border-[#5A5A5A]";
const navItem = "font-sans text-sm text-white mx-2 lg:mx-4 xl:mx-6";

export default function Nav() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openHamMenu, setOpenHamMenu] = React.useState(false);
  const { user, isLoading, error, isSignedIn } = useUser();

  return (
    <div className="sticky top-0 bg-black z-10 text-white px-4 shadow-xl py-2 xl:px-48">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div className="md:hidden">
            {" "}
            <RxHamburgerMenu
              size={25}
              fontSize={"1.5em"}
              onClick={() => setOpenHamMenu(!openHamMenu)}
            />
          </div>

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
        <div className="md:hidden flex flex-row items-center justify-center">
          <div className={navItem}>
            {user?.firstName} {user?.lastName}
          </div>
          {user ? (
            <Link href={`/profile/${user?.firstName}_${user?.lastName}`}>
              <CgProfile size={"1em"} fontSize={"1.5em"} />
            </Link>
          ) : (
            <Link href="/api/auth/login">
              <CgProfile size={"1em"} fontSize={"1.5em"} />
            </Link>
          )}
        </div>
        <div className="hidden md:flex md:flex-row md:justify-center md:items-center">
          {" "}
          <Link href="/history">
            <div className={navItem}>History</div>
          </Link>
          <Link href="/picks">
            <div className={navItem}>Picks</div>
          </Link>
          <Link href="/join">
            <div className={navItem}>Membership</div>
          </Link>
          {user ? (
            <Link href={`/profile/${user?.firstName}_${user?.lastName}`}>
              {" "}
              <div className="flex flex-row justify-center items-center">
                {" "}
                <div className={navItem}>
                  {user?.firstName} {user?.lastName}
                </div>
                <CgProfile size={"1em"} fontSize={"1.5em"} />
              </div>
            </Link>
          ) : (
            <>
              <Link href="/api/auth/login">
                <div className={navItem}>Log In</div>
              </Link>

              <div className={navItem}>Register</div>
            </>
          )}
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

          <div className={line}></div>
          <Link href="/picks" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <CiBoxList size={20} />
              <div className={menuItem}>Picks</div>
            </div>
          </Link>

          <Link href="/history" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <CiCalendar size={20} />
              <div className={menuItem}>Pick History</div>
            </div>
          </Link>

          <div className={line}></div>
          <Link href="/about" onClick={() => setOpenHamMenu(!openHamMenu)}>
            {" "}
            <div className={menuItemContainer}>
              <FcAbout size={20} />
              <div className={menuItem}>What we Do</div>
            </div>
          </Link>

          {user?.role == "ADMIN" && (
            <Link href="/Admin" onClick={() => setOpenHamMenu(!openHamMenu)}>
              {" "}
              <div className={menuItemContainer}>
                <FiTool size={20} />
                <div className={menuItem}>Admin Tools</div>
              </div>
            </Link>
          )}
          <div className={line}></div>
        </div>
      )}
    </div>
  );
}
