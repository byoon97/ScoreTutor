/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

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

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    !loading && console.log(data);
  }, [loading]);

  return (
    <div className="relative flex flex-col h-64 md:h-[30rem] xl:mx-48">
      {!loading &&
        data.getArticles.map((article: Article) => (
          <div key={article.id}>
            <img
              src={article.imageURL}
              alt={`Slide ${article.id + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
    </div>
  );
};

export default Carousel;
