/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, RefObject } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSwipeable } from "react-swipeable";

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

const GameCarousel: React.FC<GameCarouselProps> = ({ gameData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const swipeableRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = (): void => {
    carouselRef.current?.scrollBy({
      left: -300, // Adjust the value based on your card width
      behavior: "smooth",
    });
  };

  const scrollRight = (): void => {
    carouselRef.current?.scrollBy({
      left: 300, // Adjust the value based on your card width
      behavior: "smooth",
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (swipeableRef.current) {
        swipeableRef.current.scrollLeft += 300; // Adjust the scroll distance
      }
    },
    onSwipedRight: () => {
      if (swipeableRef.current) {
        swipeableRef.current.scrollLeft -= 300; // Adjust the scroll distance
      }
    },
  });

  return (
    <div
      ref={carouselRef}
      className="h-full flex items-center overflow-x-hidden overflow-y-hidden justify-center whitespace-nowrap space-x-4 px-4"
    >
      {/* <div className="flex flex-row">
        <button
          onClick={scrollLeft}
          className="hover:bg-gray-300 focus:outline-none"
        >
          <IoIosArrowBack size={24} className="text-black" />
        </button>
        <button
          onClick={scrollRight}
          className="hover:bg-gray-300 focus:outline-none"
        >
          <IoIosArrowForward size={24} className="text-black" />
        </button>
      </div> */}
      <div
        ref={(el) => {
          swipeableRef.current = el;
          handlers.ref(el);
        }}
        className="flex overflow-x-hidden snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
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
                className="flex flex-col border-[1px] rounded-md font-sans py-4 px-2 flex-shrink-0 mr-2 min-w-[10rem]"
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
                    <div className="text-[12px] pl-2">
                      {event?.teams[0].name} @&nbsp;
                    </div>
                  </div>
                  <div className="flex flex-row items-center font-bold">
                    <div className="flex flex-row items-center font-bold text-[12px] pr-2">
                      <div>&nbsp;{event?.teams[1].name}</div>
                      {/* <div>&nbsp;{formattedSpread}</div> */}
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
    </div>
  );
};

export default GameCarousel;
