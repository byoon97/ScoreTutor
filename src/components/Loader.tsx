// Loader.tsx
import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center py-8 bg-[#0A0B0D] w-screen">
      <div className="h-20 w-20 rounded-full border-8 border-gray-300 border-t-blue-600 animate-spin"></div>
    </div>
  );
}

export default Loader;
