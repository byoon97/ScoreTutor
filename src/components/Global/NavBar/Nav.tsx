"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { gql, useQuery } from "@apollo/client";

const menuItemContainer = "flex flex-row items-center p-4 cursor-pointer";
const menuItem = "font-thin pl-2";

const GET_USER_QUERY = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

export default function Nav() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openHamMenu, setOpenHamMenu] = React.useState(false);
  const { user } = useUser();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="sticky top-0 bg-black z-10 text-white px-4 shadow-xl py-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <RxHamburgerMenu
            size={25}
            fontSize={"1.5em"}
            onClick={() => setOpenHamMenu(!openHamMenu)}
          />
          <Image src="/image.png" alt="logo" width="100" height="100" />
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
          <Link href="/api/auth/login">
            <div className={menuItemContainer}>
              <FaSignInAlt size={20} />
              <div className={menuItem}>Sign In</div>
            </div>
          </Link>
          {data ? (
            <Link
              href={`/profile/${data?.getUserByEmail?.firstName}_${data?.getUserByEmail?.lastName}_${data?.getUserByEmail?.id}`}
            >
              {" "}
              <div className={menuItemContainer}>
                <CgProfile size={20} />
                <div className={menuItem}>Profile</div>
              </div>
            </Link>
          ) : null}

          <Link href="/join">
            {" "}
            <div className={menuItemContainer}>
              <MdCardMembership size={20} />
              <div className={menuItem}>Membership</div>
            </div>
          </Link>

          <div className="border-b-[1px] border-[#5A5A5A]"></div>
          <Link href="/picks">
            {" "}
            <div className={menuItemContainer}>
              <CiBoxList size={20} />
              <div className={menuItem}>Picks</div>
            </div>
          </Link>

          <Link href="/calendar">
            {" "}
            <div className={menuItemContainer}>
              <CiCalendar size={20} />
              <div className={menuItem}>Pick History</div>
            </div>
          </Link>

          <div className="border-b-[1px] border-[#5A5A5A]"></div>
          <Link href="/about">
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
