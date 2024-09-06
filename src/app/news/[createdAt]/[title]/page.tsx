"use client";
import React from "react";
import SportsbookCarousel from "@/components/HomeComps/Sportsbook";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import { SocialIcon } from "react-social-icons";
import { Article } from "@/types";
import ArticleCarousel from "@/components/ArticleComps/ArticleCarousel";

const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: Int!) {
    getArticleById(id: $id) {
      id
      createdAt
      imageURL
      title
      body
      synopsis
      league
    }
  }
`;

const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    getArticles {
      id
      createdAt
      title
      imageURL
      league
    }
  }
`;
  
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

const ArticlePage: React.FC = () => {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query");
  const url = typeof window !== "undefined" ? window.location.href : ""; // Get the current URL

  const { loading, error, data } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id: Number(currentQuery) },
  });

  const {
    data: allArticles,
    error: allArtError,
    loading: allArtsLoad,
  } = useQuery(GET_ARTICLES_QUERY);

  const article = data?.getArticleById;
  const splitText = article?.body.split(" - ");

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(article?.title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  let filteredArticles;

  if (!allArtsLoad) {
    console.log(allArticles, allArtError);
    filteredArticles = allArticles?.getArticles.filter(
      (article: Article) => article.id.toString() != currentQuery
    );
  } else {
    console.log(allArtsLoad);
  }

  return (
    !loading && (
      <div className="flex flex-col bg-white text-black">
        <div className="image w-full relative pb-[56.25%] overflow-hidden before:hidden">
          <img
            src={article.imageURL}
            alt=""
            className="absolute inset-o w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col border-b-[1px] border-black text-center items-center mb-6 pb-6 space-y-4">
          <h1 className="text-[#070528] heading-xl xl:max-w-[75%] font-sans  text-[32px] md:text-[40px] md:px-32 xl:text-[48px] font-semibold pt-6 mx-auto font-weight:700 ">
            {article?.title}
          </h1>

          <div className="flex flex-row items-center space-x-4 pb-4">
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
              <SocialIcon url={twitterShareUrl} as="div" />
            </a>
            <a href={redditShareUrl} target="_blank" rel="noopener noreferrer">
              <SocialIcon url={redditShareUrl} as="div" />
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon url={facebookShareUrl} as="div" />
            </a>
          </div>
          <div className="rounded-[50px] text-blue-600 border-blue-600 border-[1px] font-semibold py-1 px-2 my-2 text-[12px]">
            {article?.league}
          </div>
          <div className="text-[12px] font-semibold">
            {formatDate(article?.createdAt)}
          </div>
        </div>
        <div className="text-sm  leading:4 lg:leading-5 lg:text-[14px] p-4 md:px-20 lg:px-[200px] xl:px-[300px] text-gray-500 border-b-[1px] border-black mb-8">
          {splitText.map((text: string, index: number) => (
            <div key={index}>
              <p>{text}</p>
              <br />
            </div>
          ))}
        </div>

        {filteredArticles.length > 0 && (
          <ArticleCarousel articles={filteredArticles} />
        )}

        <SportsbookCarousel />
      </div>
    )
  );
};

export default ArticlePage;
