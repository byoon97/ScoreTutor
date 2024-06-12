"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@/app/context/UserContext/userStore";
import MyChart from "@/components/profilePageComps/Chart";

const GET_DAILY_UNITS = gql`
  query GetDailyUnits {
    getDailyUnits {
      date
      netUnits
    }
  }
`;

const GET_TOTAL_UNITS = gql`
  query GetUnitCount {
    getUnitCount {
      netUnits
    }
  }
`;

const Page: React.FC = () => {
  const { isLoading, isSignedIn, user } = useUser();
  const { loading, error, data: units } = useQuery(GET_DAILY_UNITS);
  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);

  return (
    <div className="bg-[#F6F7FB] p-2 xl:px-64 xl:py-8">
      <div className="flex flex-col w-full">
        <h1 className=" text-black text-center p-4 font-mono">Profile</h1>
        <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div>
      </div>
      {isLoading && !user ? (
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
              {user && !totalLoad && (
                <div className="text-[12px] font-mono">
                  <div className="flex">
                    <div className="w-20">
                      <span className="text-[#151F2B]">Bankroll : </span>
                    </div>
                    <div>
                      {user?.bankroll +
                        user?.unitSize * netUnits.getUnitCount[0].netUnits}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-20">
                      <span className="text-[#151F2B]">Units Up :</span>
                    </div>
                    {/* fix to from when user joins */}
                    <div>{netUnits.getUnitCount[0].netUnits.toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>{" "}
            <div className="edit flex items-center justify-center my-2">
              <button className="rounded-lg shadow-lg bg-[#DCF2F2] font-mono w-20 text-xs h-6">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* make sure daily units are from when user joins */}
      {!loading && !isLoading && (
        <MyChart units={units.getDailyUnits} user={user} />
      )}
    </div>
  );
};

export default Page;
