import React, { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack } from "react-icons/io";
import { Sportsbook, sportsbooks } from "../../../public/data/sportsbook";

const SportsbookCarousel: React.FC = () => {
  return (
    <div className=" rounded-lg flex flex-col mx-2 mb-5">
      <div className="bg-white rounded-lg border-[1px]">
        <h2 className="text-xl font-bold text-left border-b-[1px] p-4">
          Offers
        </h2>

        {Sportsbook.map((book) => (
          <div
            key={book.id}
            className="border-b py-2 bg-white flex flex-col w-full"
          >
            <div className="flex items-center space-x-4 px-4 w-full pb-2">
              <img
                src={book.imageURL}
                alt={book.name}
                className="w-16 h-16 object-contain"
              />
              {/* ITEM 1 */}
              <div className="flex flex-col md:flex-row items-start w-full justify-center md:items-center">
                <div className="pb-2 lg:w-1/2">
                  {" "}
                  <h3 className="text-lg font-bold">{book.name}</h3>
                  <p className="mt-1 text-sm text-gray-700">{book.promo}</p>
                  <p className="text-[8px]">
                    {book.promo} Must be 21+ and Present in New York. Gambling
                    Problem? Call 1-877-8-HOPENY or Text HOPENY. New Users Only.
                    T&Cs Apply.
                  </p>
                </div>

                <div className="flex flex-row space-between lg:w-1/2 md:px-2 items-center justify-center text-[10px] space-x-4">
                  {" "}
                  <div className="text-gray-500">
                    <strong className="px-4 py-2 bg-gray-200 text-black rounded-lg border-dashed border-[1px] border-black">
                      {book.code === "No Code" ? "No Code Needed" : book.code}
                    </strong>
                  </div>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black px-4 py-2 rounded-md bg-yellow-600 transition-colors duration-200 border-[1px]"
                  >
                    Claim Offer
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsbookCarousel;
