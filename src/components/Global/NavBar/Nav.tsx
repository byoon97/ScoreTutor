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
import "../../../app/css/Nav.css";

const menuItemContainer = "flex flex-row items-center p-4 cursor-pointer";
const menuItem = "font-sans pl-2";
const line = "border-b-[1px] border-[#5A5A5A]";
const navItem = "underline-effect font-sans text-sm text-white w-18";

export default function Nav() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openHamMenu, setOpenHamMenu] = React.useState(false);
  const { user, isLoading, error, isSignedIn } = useUser();

  return (
    <div className="sticky top-0 bg-black z-20 text-white px-2 shadow-xl py-2 xl:px-48">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
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
        <div className="md:hidden flex flex-row items-center justify-center space-x-4">
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
          <div className="md:hidden ml-2">
            <RxHamburgerMenu
              size={25}
              fontSize={"1.5em"}
              onClick={() => setOpenHamMenu(!openHamMenu)}
            />
          </div>
        </div>
        <div className="hidden md:flex md:flex-row md:justify-center md:items-center md:space-x-8">
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
            <Link href={`/profile/${user?.id}`}>
              <div className="flex flex-row justify-center items-center space-x-2">
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
      </div>
      <div
        className={`fixed inset-0 bg-black text-white z-30 transform font-sans ${
          openHamMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out flex flex-col p-4 space-y-4`}
        style={{ top: "60px" }} // Adjust the top value to avoid covering the navbar
      >
        {!isSignedIn ? (
          <Link href="/api/auth/login" onClick={() => setOpenHamMenu(false)}>
            <div className={menuItemContainer}>
              <FaSignInAlt size={20} />
              <div className={menuItem}>Sign In</div>
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/logout" onClick={() => setOpenHamMenu(false)}>
            <div className={menuItemContainer}>
              <FaSignInAlt size={20} />
              <div className={menuItem}>Sign Out</div>
            </div>
          </Link>
        )}
        {isSignedIn && (
          <Link
            href={`/profile/${user?.id}`}
            onClick={() => setOpenHamMenu(false)}
          >
            <div className={menuItemContainer}>
              <CgProfile size={20} />
              <div className={menuItem}>Profile</div>
            </div>
          </Link>
        )}
        <Link href="/join" onClick={() => setOpenHamMenu(false)}>
          <div className={menuItemContainer}>
            <MdCardMembership size={20} />
            <div className={menuItem}>Membership</div>
          </div>
        </Link>
        <div className={line}></div>
        <Link href="/picks" onClick={() => setOpenHamMenu(false)}>
          <div className={menuItemContainer}>
            <CiBoxList size={20} />
            <div className={menuItem}>Picks</div>
          </div>
        </Link>
        <Link href="/history" onClick={() => setOpenHamMenu(false)}>
          <div className={menuItemContainer}>
            <CiCalendar size={20} />
            <div className={menuItem}>Pick History</div>
          </div>
        </Link>
        <div className={line}></div>
        <Link href="/about" onClick={() => setOpenHamMenu(false)}>
          <div className={menuItemContainer}>
            <FcAbout size={20} />
            <div className={menuItem}>What We Do</div>
          </div>
        </Link>
        {user?.role === "ADMIN" && (
          <Link href="/Admin" onClick={() => setOpenHamMenu(false)}>
            <div className={menuItemContainer}>
              <FiTool size={20} />
              <div className={menuItem}>Admin Tools</div>
            </div>
          </Link>
        )}
        <div className={line}></div>
      </div>
    </div>
  );
}
