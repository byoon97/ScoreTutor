import { Article } from "@/types";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  LiaLongArrowAltRightSolid,
  LiaLongArrowAltLeftSolid,
} from "react-icons/lia";
import useEmblaCarousel from "embla-carousel-react";

interface ArticleCarouselProps {
  articles: Article[];
}


const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

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

  const getDaysAgo = (dateString: Date): string => {
    const today = new Date();
    const date = new Date(dateString);
    const timeDifference = today.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return `${daysDifference}d`;
  };

  return (
    <div className=" lg:mx-24 xl:mx-48 ">
      <div className="flex flex-row justify-between items-center px-4 pb-4 text-[20px] md:text-[30px] lg:text-[35px] xl:text-[40px] ">
        {" "}
        <h1 className="font-semibold font-sans">Related</h1>
        <div className="flex space-x-4">
          <button
            className="text-black py-2 cursor-pointer"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <LiaLongArrowAltLeftSolid size={20} />
          </button>
          <button
            className="text-black py-2 cursor-pointer"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <LiaLongArrowAltRightSolid size={20} />
          </button>
        </div>
      </div>

      <div
        ref={emblaRef}
        className="embla relative flex flex-col md:flex-row items-center justify-center text-black font-sans"
      >
        <div className="embla__container">
          {articles.map((article) => {
            const title = article.title.split(" ").join("-");

            const link = `/news/${article.createdAt}/${title}/?query=${article.id}`;

            return (
              <div
                key={article.id}
                className="flex flex-col items-center justify-center px-2 my-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
              >
                {" "}
                <Link
                  href={link}
                  className="image w-full aspect-video relative mb-4"
                >
                  <img
                    src={article.imageURL}
                    alt={`Slide ${article.id}`}
                    className="cursor-pointer w-full h-full pt-1 px-2 inset-0 object-cover object-top rounded-[20px]"
                  />
                </Link>
                <div className="flex flex-col space-y-2">
                  <Link href={link}>
                    <h2 className="cursor-pointer text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] pt-2 md:pt-0 md:pl-4 flex items-center justify-center text-center mx-2 md:mx-8 font-semibold leading-4">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="flex flex-row justify-center items-center space-x-4">
                    {" "}
                    <div className="rounded-[50px] text-blue-600 border-blue-600 border-[1px] font-semibold py-1 px-2 my-2 text-[12px]">
                      {article?.league}
                    </div>
                    <div className="text-[12px] font-semibold">
                      {getDaysAgo(article?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticleCarousel;
