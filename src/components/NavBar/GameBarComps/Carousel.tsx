/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

interface GameCarouselProps {
  gameData: game[];
}

interface game {
  eventId: string;
  lines: {
    spread: {
      point_spread_home: number;
    };
  };
  schedule: {
    event_name: string;
  };
  sportId: number;
  teams: team[];
}

interface team {
  name: string;
  teamLogo: string;
}

interface Event {
  schedule?: {
    event_name?: string;
  };
}

const GameCarousel: React.FC<GameCarouselProps> = ({ gameData }) => {
  return (
    <div className="h-full flex items-center overflow-x-auto overflow-y-hidden justify-center whitespace-nowrap space-x-4 px-4">
      {gameData &&
        gameData.map((event, idx) => {
          const pointSpread = event?.lines?.spread?.point_spread_home;
          const formattedSpread =
            pointSpread && pointSpread >= 0
              ? `+${pointSpread}`
              : String(pointSpread);
          const time =
            event?.schedule?.event_name.split(" ")[
              event?.schedule?.event_name.split(" ").length - 1
            ];
          const date = new Date(time);
          const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
            timeZone: "America/New_York",
          };

          const formattedTime = date.toLocaleString("en-US", options);

          return (
            <div
              key={idx}
              className="flex flex-col border-[1px] rounded-md font-sans py-4 px-2 flex-shrink-0"
            >
              <div className="flex flex-row justify-between text-xs">
                <div>{formattedTime}</div>
                <div>Expert Pick</div>
              </div>

              <div className="flex flex-row pt-4 text-sm">
                <div className="flex flex-row items-center justify-between font-bold">
                  <img
                    src={event?.teams[0].teamLogo}
                    alt="team logo"
                    width={30}
                    height={30}
                  />
                  <div className="text-[12px] pl-4">
                    {event?.teams[0].name} @&nbsp;
                  </div>
                </div>
                <div className="flex flex-row items-center font-bold">
                  <div className="flex flex-row items-center font-bold text-[12px] pr-4">
                    <div>&nbsp;{event?.teams[1].name}</div>
                    <div>&nbsp;{formattedSpread}</div>
                  </div>
                  <img
                    src={event?.teams[1].teamLogo}
                    alt="team logo"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GameCarousel;
