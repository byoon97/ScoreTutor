/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { convertToEST } from "@/util/getDate";
import Link from "next/link";
import LazyLoad from "react-lazyload";
import Loader from "@/components/Loader";

const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    getArticles {
      id
      createdAt
      title
      synopsis
      league
      imageURL
    }
  }
`;

interface Article {
  id: number;
  createdAt: Date;
  title: string;
  synopsis: string;
  league: string;
  imageURL: string;
}

const Carousel: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES_QUERY);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(
    !loading && data?.getArticles.length > 0 ? data.getArticles[0].id : null
  );

  useEffect(() => {
    if (!loading && data?.getArticles.length > 0 && selectedArticle === null) {
      setSelectedArticle(data.getArticles[0].id);
    }
  }, [loading, data, selectedArticle]);

  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const handleSelectArticle = (id: number) => {
    setSelectedArticle(id);
    const index = data?.getArticles.findIndex(
      (article: Article) => article.id === id
    );
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
    <div className="relative bg-[#0A0B0D] text-white flex flex-col justify-center">
      <div className="embla" ref={emblaRef}>
        <React.Suspense fallback={<div>loading</div>}>
          <div className="embla__container flex">
            {!loading ? (
              data?.getArticles.map((article: Article) => {
                console.log(article);
                const title = article.title.split(" ").join("-");
                const link = `news/${article.createdAt}/${title}/?query=${article.id}`;
                return (
                  <div
                    className="embla__slide p-4 bg-[#0A0B0D] "
                    key={article.id}
                  >
                    <div className="overflow-hidden flex flex-col lg:flex-row">
                      <div className="image w-full xl:w-[45%] aspect-video relative mb-10 before:absolute before:content-[''] before:w-[150px] before:h-[130px] before:-left-[1px] before:-top-[1px] before:rounded-[20px] before:bg-accent-gold before:z-[1] after:absolute after:content-[''] after:w-[150px] after:h-[130px] after:-right-[1px] after:-bottom-[4px] after:rounded-[20px] after:bg-accent-gold after:z-[1]">
                        <Link href={link}>
                          <LazyLoad height={200} offset={100}>
                            <img
                              src={article.imageURL}
                              alt={`Slide ${article.id}`}
                              className="cursor-pointer w-full h-full pt-1 px-2 absolute inset-0 object-cover object-top rounded-[20px] transition-transform duration-[400ms] hover:scale-105 z-[2]"
                            />
                          </LazyLoad>
                        </Link>
                      </div>

                      <div className="p-4">
                        <div className="text-sm pb-2 lg:text-lg">
                          {convertToEST(article.createdAt.toString())}
                        </div>
                        <div className=" text-sm pb-4 lg:text-lg">
                          {article.league}
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-semibold pb-4">
                          {article.title}
                        </h1>
                        <div className="text-[#C2C2C2] text-sm lg:text-lg">
                          {article.synopsis}
                        </div>
                        <Link href={link}>
                          <div className="mt-4 flex items-center text-blue-600 cursor-pointer">
                            Read article <IoIosArrowForward className="ml-1" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </React.Suspense>
      </div>
      <div className="flex md:flex-row items-center justify-center md:justify-between bg-[#0A0B0D] pb-20 lg:px-20">
        <div className="hidden md:flex md:flex-row md:space-x-8 md:px-6 ">
          {!loading &&
            data?.getArticles.map((article: Article) => (
              <div
                key={article.id}
                className={`text-white cursor-pointer ${
                  selectedArticle === article.id
                    ? "text-gray-300 border-b-[2px] border-b-accent-gold"
                    : "border-b-transparent"
                }`}
                onClick={() => handleSelectArticle(article.id)}
              >
                {article.title}
              </div>
            ))}
        </div>
        <div className="flex space-x-4">
          <button
            className=" text-white px-3 cursor-pointer"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            className=" text-white px-3 cursor-pointer"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
