import React, { useState, useCallback, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import { gql, useQuery } from "@apollo/client";
import { getDate } from "@/util/getDate";
import { useUser } from "@/app/context/UserContext/userStore";
import { SinglePickProps } from "@/components/PicksPageComps/PicksList";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { whenProvider } from "@/util/getDate";

const GET_PICKS_QUERY = gql`
  query GetPicks {
    getPicks {
      createdAt
      homeTeam
      awayTeam
      homeTeamLogo
      awayTeamLogo
      pick
      unit
      startTime
      result
      leagueLogo
      toWin
    }
  }
`;

const Picks: React.FC = () => {
  const { user } = useUser();
  const [slate, setSlate] = React.useState([]);
  const { loading, error, data } = useQuery(GET_PICKS_QUERY);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // React.useEffect(() => {
  //   if (!loading) {
  //     console.log(
  //       data.getPicks.filter(
  //         (pick: SinglePickProps) => pick.createdAt == getDate().dateCheck
  //       )
  //     );
  //     // setSlate(
  //     //   data.getPicks.filter(
  //     //     (pick: SinglePickProps) => pick.createdAt == getDate().dateCheck
  //     //   )
  //     // );
  //   }
  // }, [loading, data]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateCanScroll = () => {
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());
    };
    emblaApi.on("select", updateCanScroll);
    updateCanScroll();
  }, [emblaApi]);

  return (
    <div className="relative pb-8">
      <div className="flex flex-row items-center justify-between pt-4 px-2">
        {" "}
        <h1 className="text-black text-3xl font-sans font-bold py-4">
          Daily Premium Plays
        </h1>{" "}
        <div className="flex space-x-4">
          <button
            className="text-black py-2 cursor-pointer"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            className="text-black py-2 cursor-pointer"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {!loading &&
            data.getPicks.map((game: SinglePickProps, idx: number) => {
              const { day, when } = whenProvider(game.startTime);
              return (
                <div
                  className="embla__slide w-full md:w-1/2 lg:w-1/3 p-2"
                  key={idx}
                >
                  <div className="bg-white border-[1px] border-[#E2E8F0] my-2 text-sm p-4 rounded-lg shadow-lg hover:border-sky-500 w-full">
                    <div className="flex flex-row justify-between">
                      {when <= 0 ? (
                        <div className="text-[12px] pb-2 pr-2">In Progress</div>
                      ) : (
                        <div className="flex flex-row items-center justify-center">
                          <div className="text-[10px] text-center p-1">
                            {day}
                          </div>
                          {when <= 120 ? (
                            <div
                              className={`text-xs ${
                                when <= 120
                                  ? "bg-red-500 text-white animate-pulse"
                                  : ""
                              } p-1 rounded`}
                            >
                              {when}
                            </div>
                          ) : (
                            <span className="text-[10px] pr-2 text-center p-1">
                              {game.startTime.split(" ")[1]} EST
                            </span>
                          )}
                        </div>
                      )}
                      <img src={game.leagueLogo} alt="" className="w-8 h-6" />
                    </div>
                    <div className="flex flex-row items-center justify-start pb-2 text-[#212A31]">
                      <div className="flex flex-row items-center">
                        <img
                          src={game.awayTeamLogo}
                          alt="team logo"
                          width={27}
                          height={27}
                        />
                        &nbsp;
                        <div className="font-inter font-roboto text-[14px]">
                          {game.awayTeam}
                        </div>
                      </div>
                      &nbsp;
                      <div className="flex flex-row items-center">
                        <div className="font-inter font-roboto text-[14px]">
                          @&nbsp;{game.homeTeam}
                        </div>
                        &nbsp;
                        <img
                          src={game.homeTeamLogo}
                          alt="team logo"
                          width={27}
                          height={27}
                        />
                      </div>
                    </div>
                    <div className="py-1 text-xs">
                      <span className="font-bold text-[#144E66]">
                        Our Pick: {game.pick}
                      </span>
                      &nbsp;
                    </div>
                    <div className="border-t-[1px] border-[#E2E8F0] my-2"></div>
                    <div className="flex flex-row justify-between py-2">
                      <div>
                        <div className="text-[12px] font-bold">
                          Units Wagered: {game.unit}
                        </div>
                        <div className="text-[12px] font-bold">
                          Units to Win: {game.toWin}
                        </div>
                      </div>
                      {user && (
                        <div className="flex justify-end flex-col">
                          <div className="text-[12px] font-bold">
                            Your Wager: ${game.unit * user?.unitSize}
                          </div>
                          <div className="text-[12px] font-bold">
                            Return: ${game.toWin * user?.unitSize}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex-grow flex justify-center items-center mb-4">
        <div className="flex space-x-2">
          {!loading &&
            data.getPicks.map((_: any, index: number) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === selectedIndex ? "bg-green-500" : "bg-gray-600"
                }`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Picks;
