"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

type Props = {};

export default function Page({}: Props) {
  const [membership, setMem] = React.useState({
    type: "Month",
    price: 250,
  });

  return (
    <div className="flex flex-col bg-[#202121] py-4 lg:px-80">
      <div className="px-4 mb-4">
        <div className="flex flex-col items-center justify-center md:flex-row md:w-full">
          <div className="md:mx-6">
            {" "}
            <div className="font-bold text-3xl text-left flex flex-col tracking-wide">
              <span className="text-4xl">Unlimited Picks</span>
              <span className="mt-1">driven by data and experts</span>
              <span className="mt-1">
                delivered <span className="text-[#77D2EF] italic">DAILY!</span>
              </span>
            </div>
            <div className=" py-4 text-2xl">
              Millions Wagered, Years of Experience
            </div>
            <div className="text-xs tracking-widest text-[#595959]">
              For over a decade, the ScoreTutor team has been helping others
              grow their bankroll by giving solution based picks. With our deep
              history in sports betting, we have developed ways discover these
              picks and are now able to serve them to you!
            </div>
          </div>
          <Image
            src="/freeplay/graph.avif"
            width={300}
            height={300}
            alt="graph"
            className="md:mr-6 pt-6"
          />
        </div>
      </div>
      <div className="text-center mt-6 border-t-[1px] py-4 bg-gradient-to-r from-[2A23ED] to-[#0E0E0EF]">
        <div className="px-4">
          <div className="text-[#77D2EF] text-5xl font-bold mt-4">
            ScoreTutor VIP
          </div>
          <div className="flex flex-row my-6 rounded-lg text-[10px] rounded-lg justify-evenly font-thin h-6 md:mx-20">
            <div
              onClick={() => setMem({ type: "Month", price: 250 })}
              className={`flex items-center justify-center w-full h-full rounded-l-lg ${
                membership.type === "Month" ? "bg-[#3367AD]" : "bg-[#2C3140]"
              }`}
            >
              MONTHLY
            </div>
            <div
              onClick={() => setMem({ type: "Half Year", price: 600 })}
              className={`flex items-center justify-center w-full h-full border-x-[1px] border-white ${
                membership.type === "Half Year"
                  ? "bg-[#3367AD]"
                  : "bg-[#2C3140]"
              }`}
            >
              Half Year
            </div>
            <div
              onClick={() => setMem({ type: "1 Year", price: 1500 })}
              className={`flex items-center justify-center w-full h-full rounded-r-lg ${
                membership.type === "1 Year" ? "bg-[#3367AD]" : "bg-[#2C3140]"
              }`}
            >
              FULL YEAR
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-4xl">${membership.price}</span>
            <span className="text-sm text-[#BDBDBD]">/{membership.type}</span>
          </div>
        </div>
        <div className="text-sm flex flex-col items-center justify-center mt-4">
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            Daily Expert Picks
          </div>
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            +EV Correlated Parlays
          </div>
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            Daily Fantasy Projections and Player Props
          </div>
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            Exclusive Discord Community
          </div>
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            Live Bets
          </div>
          <div className="my-2 w-72 text-left flex flex-row">
            <FaCheck className="mr-2 text-[#3367AD]" />
            Library of Resources to Up Your Game
          </div>
        </div>{" "}
      </div>
      <button className="bg-[#3367AD] h-14 my-4 rounded-lg font-thin mx-4 md:mx-24">
        Get ScoreTutor Premium
      </button>
      <div className="border-t-[1px] mx-16 my-2 md:my-4">
        <div className="text-center text-sm font-thin mt-4 md:mx-16 lg:mx-24 lg:mt-6">
          We compare hundreds of lines against each other provided by Legal
          Sportsbooks. The odds on these lines are then ran by multiple
          algorithms and are then reviewed by our experts that have been in the
          game before the mainstream success of sports betting. We then provide
          the back-tested, profitable, reveiwed bets with our supporting users!
        </div>
      </div>
    </div>
  );
}
