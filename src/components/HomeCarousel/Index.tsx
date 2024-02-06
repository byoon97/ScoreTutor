/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
  const images: string[] = [
    "/freeplay/oilersknights.webp",
    "/freeplay/ttwv.jpeg",
    "/freeplay/buckssuns.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []); // Runs only once when component mounts

  return (
    <div className="relative w-full mt-4 flex flex-col h-64 md:h-[30rem] lg:mx-8 md:mb-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 right-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
