import Image from "next/image";
import React from "react";

interface Props {}

const reasonsArr = [
  {
    title: "GROW",
    msg: "We help you grow your bankroll by giving you appropriate picks with respective unit sizes to drastically increase your chances of being a profitable sports bettor.",
    img: "/join/grow.png",
  },
  {
    title: "LEARN",
    msg: "Level up your game and be more confident in every bet you take. We are more than open in sharing what we have learned over the years in order to help you become a better bettor.",
    img: "/join/learn.png",
  },
  {
    title: "COMMUNITY",
    msg: "Join a community that shares common interest and goals. Develop connections that are beneficial for you.",
    img: "/join/community.png",
  },
  {
    title: "AND MORE",
    msg: "We are more than just cappers. We offer many tools and resources as well as a service to our community. We are here to make your experience better, no matter your bankroll. Come join us and see what we have to offer!",
    img: "/join/misc.png",
  },
];

export default function Reasons({}: Props) {
  return (
    <div className="flex flex-col text-center py-16 border-t-[1px]">
      <h1 className="text-3xl">What We Offer</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-4 xl:mx-32 lg:h-[17em]">
        {reasonsArr.map((reason) => (
          <div
            key={reasonsArr.indexOf(reason)}
            className="flex flex-col items-center justiy-center lg:w-1/4 h-full"
          >
            <Image src={reason.img} alt="image" width={125} height={125} />
            <h4 className="text-2xl font-sans">{reason.title}</h4>
            <p className="text-xs mt-4 mx-16 md:mx-44 lg:mx-4">{reason.msg}</p>
            <div className="lg:hidden border-[1px] w-24 md:w-36 my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
