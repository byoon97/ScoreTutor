"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import Reasons from "./joinBenefits";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

interface Props {}

const benefitsArr = [
  "Daily Expert Picks",
  "Daily Fantasy Projections and Player Props",
  "+EV Correlated Plays",
  "Exclusive Discord Community",
  "Live Bets Updates",
  "Library of Resources to Level Up Your Game",
  "Direct Access to the Team",
  "Free ",
];

export default function Page({}: Props) {
  const { user } = useUser();
  const [membership, setMem] = React.useState({
    name: "Month",
    price: 250,
  });

  const checkout = async () => {
    console.log(user);
    await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: membership, user }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          window.location.href = response.url;
        }
      });
  };

  return (
    <div className="bg-[#202121] flex flex-col px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center lg:mx-30 lg:pb-16">
        <div className="lg:mx-12">
          <div className="font-bold text-3xl text-left flex flex-col tracking-wide">
            <span className="text-6xl">Unlimited Picks</span>
            <span className="mt-1">driven by data and experts,</span>
            <span className="mt-1">
              delivered <span className="text-[#77D2EF] italic">DAILY!</span>
            </span>
          </div>
          <div className=" py-4 text-2xl">
            Millions Wagered, Years of Experience
          </div>
          <div className="text-xs lg:text-sm tracking-widest text-[#595959] xl:w-80">
            For over a decade, the MKAbets team has been helping others grow
            their bankroll by giving solution based picks. With our deep history
            in sports betting, we have developed ways discover these picks and
            are now able to serve them to you!
          </div>
        </div>
        <Image
          src="/join/fd.png"
          width={400}
          height={400}
          alt="graph"
          className="md:mr-6 py-6"
        />
      </div>

      <Reasons />

      <div className="flex flex-col items-center justify-cener text-center mt-6 border-t-[1px] py-4 lg:py-16">
        <div className="px-4 w-full flex items-center flex-col">
          <div className="text-[#77D2EF] text-5xl font-bold mt-4">
            MKAbets VIP
          </div>
          <div className="flex flex-row my-6 rounded-lg text-[10px] justify-evenly font-thin h-6 w-full md:w-5/6 xl:w-3/4">
            <div
              onClick={() => setMem({ name: "Month", price: 250 })}
              className={`flex items-center justify-center w-full h-full rounded-l-lg ${
                membership.name === "Month" ? "bg-[#3367AD]" : "bg-[#2C3140]"
              }`}
            >
              MONTHLY
            </div>
            <div
              onClick={() => setMem({ name: "Half Year", price: 600 })}
              className={`flex items-center justify-center w-full h-full border-x-[1px] border-white ${
                membership.name === "Half Year"
                  ? "bg-[#3367AD]"
                  : "bg-[#2C3140]"
              }`}
            >
              HALF YEAR
            </div>
            <div
              onClick={() => setMem({ name: "1 Year", price: 1500 })}
              className={`flex items-center justify-center w-full h-full rounded-r-lg ${
                membership.name === "1 Year" ? "bg-[#3367AD]" : "bg-[#2C3140]"
              }`}
            >
              FULL YEAR
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-4xl">${membership.price}</span>
            <span className="text-sm text-[#BDBDBD]">/{membership.name}</span>
          </div>
        </div>
        <div className="text-sm flex flex-col items-center justify-center mt-4">
          {benefitsArr.map((benefit) => {
            return (
              <div
                key={benefitsArr.indexOf(benefit)}
                className="my-2 w-72 text-left flex flex-row"
              >
                {" "}
                <FaCheck className="mr-2 text-[#3367AD]" />
                {benefitsArr[benefitsArr.indexOf(benefit)]}
              </div>
            );
          })}
        </div>

        {user ? (
          <button
            className="bg-[#3367AD] h-14 mt-4 rounded-lg font-thin w-80"
            onClick={checkout}
          >
            Get MKAbets Premium
          </button>
        ) : (
          <Link href="/api/auth/login">
            {" "}
            <div className="bg-[#3367AD] h-14 mt-4 rounded-lg font-thin w-80 flex items-center justify-center">
              Sign In to get Premium
            </div>
          </Link>
        )}
      </div>

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
