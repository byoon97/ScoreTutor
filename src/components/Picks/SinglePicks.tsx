/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC } from "react";
import { picks } from "@/data/picks";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const SinglePicks: FC = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col mt-2">
      {picks.map((pick, idx) => (
        <div
          key={idx}
          className="w-full flex flex-col border-[1px] rounded-lg shadow-lg my-2 bg-white p-4"
        >
          <div className="flex flex-row justify-between">
            <div className="font-sans text-sm text-[#656667]">{pick.when}</div>
            <div>
              <Image src={pick.logo} alt="logo" width={35} height={35} />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center">
              {" "}
              <img
                src={pick.awayTeamLogo}
                alt="team logo"
                width={30}
                height={30}
              />
              <div className="font-inter text-[12px] pl-2">{pick.awayTeam}</div>
            </div>
            <div className="flex flex-row justify-start items-center mt-2 ">
              {" "}
              <img
                src={pick.homeTeamLogo}
                alt="team logo"
                width={30}
                height={30}
              />
              <div className="font-inter text-[12px] pl-2">{pick.homeTeam}</div>
            </div>
          </div>

          {user ? (
            <button className="text-center rounded-lg bg-[#77D2EF] mt-3 h-10 shadow-lg text-black font-inter">
              <Link href="/picks"> Get Pick </Link>
            </button>
          ) : (
            <button className="text-center rounded-lg bg-[#77D2EF] mt-3 h-10 shadow-lg text-black font-inter">
              <Link href="/join"> Join Now </Link>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SinglePicks;
