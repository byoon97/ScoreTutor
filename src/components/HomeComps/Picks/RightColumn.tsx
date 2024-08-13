import React, { FC } from "react";
import { PiTelegramLogo } from "react-icons/pi";
import { FaDiscord } from "react-icons/fa";

const RightColumn: FC = () => {
  return (
    <div className="w-1/3 ml-4 px-2 flex flex-col font-roboto">
      <div className="flex flex-col text-[14px] bg-white rounded-lg shadow-lg p-4">
        <div className="font-bold  text-center mb-2">
          We are currently 9-1 in our last NBA Plays 🔥🤑💰💸
        </div>
        <div className="text-[12px]">
          Click{" "}
          <a href="/join" className="text-[#77D2EF]">
            here{" "}
          </a>{" "}
          to gain access to all of our premium plays
        </div>
      </div>
      <div className="flex flex-col text-[14px] bg-white rounded-lg shadow-lg p-4 mt-4">
        <div className="font-bold  text-left mb-2">Track how we are doing</div>
        <div className="text-[12px]">
          Click{" "}
          <a href="/history" className="text-[#77D2EF]">
            here
          </a>{" "}
          to view our betting history{" "}
        </div>
      </div>
      <div className="bg-[#5D5C61] rounded-lg text-white font-sans p-4 mt-4">
        <div className="flex flex-col  mb-2 text-[13px]">
          <div className="flex flex-row items-center mb-1">
            {" "}
            <PiTelegramLogo className="text-[#77D2EF]" size={25} />
            <div className="pl-2">MKA Telegram</div>
          </div>

          <div className="text-[12px]">
            Get <span className="italic text-lime-500">FREE</span> picks
            straight to your phone!
          </div>
        </div>

        <div className=" text-[10px] mb-2">
          {" "}
          <span>
            Join our official telegram to gain instant{" "}
            <span className="italic text-lime-500">free</span> access to our
            daily updates, giveaways, challenges, live bets, and more!
          </span>
        </div>

        <div className=" text-[10px]">
          <span>
            Click&nbsp;
            <a className="text-[#77D2EF]" href="http://t.me/mkabets">
              here&nbsp;
            </a>
            to join!
          </span>
        </div>
      </div>

      {/* DISCORD */}
      <div className="bg-[#5D5C61] rounded-lg text-white font-sans p-4 mt-4">
        <div className="flex flex-col  mb-2 text-[13px]">
          <div className="flex flex-row items-center mb-1">
            {" "}
            <FaDiscord className="text-[#77D2EF]" size={25} />
            <div className="pl-2">MKA Discord</div>
          </div>

          <div className="text-[12px]">
            Interact with our team anytime, anywhere!
          </div>
        </div>

        <div className=" text-[10px] mb-2">
          {" "}
          <span>
            Join our official discord to interact with the MKA team, as well as
            other subscribers and members. We drop our{" "}
            <span className="italic text-lime-500">FREE</span> live plays here
            as well as answer any questions and/or concerns
          </span>
        </div>

        <div className=" text-[10px]">
          <span>
            Click&nbsp;
            <a className="text-[#77D2EF]" href="https://discord.gg/WQRuxsJx3B">
              here&nbsp;
            </a>
            to join!{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
