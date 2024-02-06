"use client";
import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
  const images: string[] = [
    "/freeplay/mavsmagic.jpeg",
    "/freeplay/mavsmagic.jpeg",
    "/freeplay/mavsmagic.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []); // Runs only once when component mounts

  return (
    <div className="relative w-[800px] h-[450px] mr-2">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full bg-gray-300 focus:outline-none ${
              currentSlide === index ? "bg-gray-600" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
