// Loader.tsx
import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#0cbaba] bg-gradient-to-br from-[#0cbaba] to-[#380036] h-screen flex items-center justify-center">
        <div className="loader">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
