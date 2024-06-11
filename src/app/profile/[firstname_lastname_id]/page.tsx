"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@/app/context/UserContext/userStore";
import MyChart from "@/components/profilePageComps/Chart";

const Page: React.FC = () => {
  const { isLoading, isSignedIn, user } = useUser();

  return (
    <div className="bg-[#F6F7FB] p-2 xl:px-64 xl:py-8">
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg my-2 flex flex-row justify-between">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <div className="text-[12px] lg:text-[14px] font-mono flex-grow">
                <div className="flex">
                  <div className="w-3/8">
                    <span className="text-[#151F2B]">Name:</span>
                  </div>
                  <div className="w-36">
                    {user?.firstName} {user?.lastName}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3/8">
                    <span className="text-[#151F2B]">Display Name :</span>
                  </div>
                  <div className="w-36">{/* Display name value here */}</div>
                </div>
                <div className="flex">
                  <div className="w-3/8">
                    <span className="text-[#151F2B]">Email :</span>
                  </div>
                  <div className="w-36">{user?.email}</div>
                </div>
                <div className="flex">
                  <div className="w-3/8">
                    <span className="text-[#151F2B]">Active Member :</span>
                  </div>
                  <div className="w-36">Yes</div>
                </div>
              </div>
              <div className="text-[12px] font-mono">
                <div className="flex">
                  <div className="w-20">
                    <span className="text-[#151F2B]">Bankroll :</span>
                  </div>
                  <div>$1420.24</div>
                </div>
                <div className="flex">
                  <div className="w-20">
                    <span className="text-[#151F2B]">Units Up :</span>
                  </div>
                  <div>+45.2</div>
                </div>
              </div>
            </div>{" "}
            <div className="edit flex items-center justify-center my-2">
              <button className="rounded-lg shadow-lg bg-[#DCF2F2] font-mono w-20 text-xs h-6">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      <MyChart />
    </div>
  );
};

export default Page;
