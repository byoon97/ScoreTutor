import React from "react";

const Success: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-white p-6 md:mx-auto">
        <div className="w-16 h-16 mx-auto my-4 text-green-600">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
            Connection Done! 🎉🎉
          </h3>
          <p className="text-gray-600 my-2">You may safely close this page </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
