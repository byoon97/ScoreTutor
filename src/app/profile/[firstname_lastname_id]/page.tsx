"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@/app/context/UserContext/userStore";
import MyChart from "@/components/profilePageComps/Chart";
import { isBefore, isAfter, isEqual, compareAsc } from "date-fns";
import { isMembershipExpired } from "@/util/profileUtil";
import { convertToEST } from "@/util/getDate";
import EditUserModal from "@/components/profilePageComps/EditUser";
import { Toaster } from "react-hot-toast";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";
import { getDataForCurrentMonth, getDataForMostRecent } from "@/util/chartUtil";

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

const overViewContainer = "flex flex-col text-white text-center";
const overViewHeader = "text-[12px]";
const overViewNumber = "text-[30px] flex flex-row items-center";
const overViewBorder = "border-r-[1px] border-gray-300 my-2";

const Page: React.FC = () => {
  const { isLoading, isSignedIn, user } = useUser();
  const { loading, error, data: units } = useQuery(GET_DAILY_UNITS);
  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);
  const [userUnits, setUserUnits] = React.useState();
  const [hasFiltered, setHasFiltered] = React.useState<boolean>(false);
  const [currentWk, setCurrentWk] = React.useState<number | undefined>(
    undefined
  );
  const [currentMonth, setCurrentMonth] = React.useState<number | undefined>(
    undefined
  );
  const [currentTotal, setCurrentTotal] = React.useState<number | undefined>(
    undefined
  );

  if (!isLoading && !loading && !hasFiltered) {
    const userCreatedAt = user?.createdAt
      ? new Date(user.createdAt)
      : undefined;

    if (userCreatedAt) {
      const filteredDays = units.getDailyUnits.filter((day: { date: string }) =>
        isAfter(new Date(day.date), userCreatedAt)
      );
      setUserUnits(filteredDays);
      setHasFiltered(true); // Set hasFiltered to true to prevent re-execution
    }
  }

  if (user && units && netUnits) {
    const newMonth =
      Number(
        getDataForCurrentMonth(units.getDailyUnits)[
          units.getDailyUnits.length - 1
        ].toFixed(2)
      ) * user.unitSize;

    const newWeek =
      Number(
        getDataForMostRecent(units.getDailyUnits)[
          units.getDailyUnits.length - 1
        ].toFixed(2)
      ) * user.unitSize;

    const newTotal = user.unitSize * netUnits.getUnitCount[0].netUnits;

    if (currentMonth !== newMonth) {
      setCurrentMonth(newMonth);
    }

    if (currentWk !== newWeek) {
      setCurrentWk(newWeek);
    }

    if (currentTotal !== newTotal) {
      setCurrentTotal(newTotal);
    }
  }

  return (
    <div className="bg-[#F6F7FB] h-full font-sans leading-tighter">
      {isLoading && !user ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row text-black">
          <div className="bg-gray-800 text-white w-full md:w-1/4 lg:w-1/5 p-4 space-y-6 hidden md:flex">
            <nav className="flex flex-col space-y-4 text-[13px] w-full">
              <a
                href="#"
                className="flex items-center space-x-2 hover:text-gray-300 w-full"
              >
                <FaUser />
                <div className="flex flex-row justify-between items-center w-full">
                  {" "}
                  <span>Profile</span>
                  <IoIosArrowForward />
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 hover:text-gray-300 w-full"
              >
                <FaCog />
                <div className="flex flex-row justify-between items-center w-full">
                  <span>Settings</span>
                  <IoIosArrowForward />
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 hover:text-gray-300 w-full"
              >
                <FaSignOutAlt />
                <div className="flex flex-row justify-between items-center w-full">
                  <span>Logout</span>
                  <IoIosArrowForward />
                </div>
              </a>
            </nav>
          </div>
          <div className="flex flex-col flex-1">
            <div className="pl-6 py-4 flex flex-col">
              <div className="font-bold text-[17x]">Dashboard</div>
              <div className="text-[10px] text-gray-400">
                Profile/Units Current
              </div>
            </div>
            <div className="flex-1 px-6 bg-gray-100">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col space-y-3">
                  <div className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="border-b-[1px] border-gray-200"></div>{" "}
                  <div className="flex md:flex-row flex-col">
                    {" "}
                    <div className="flex flex-col space-y-2 items-start text-[12px] pb-2">
                      <div className="flex">
                        <div className="w-40 text-start">
                          <span className="text-[#151F2B]">Email:</span>
                        </div>
                        <div className="w-44 text-[#45A29F]">{user?.email}</div>
                      </div>
                      <div className="flex">
                        <div className="w-40">
                          <span className="text-[#151F2B]">Email Alerts:</span>
                        </div>
                        <div className="w-44">
                          {user?.emailNotifs ? "Enabled" : "Disabled"}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-40">
                          <span className="text-[#151F2B]">
                            Active Member:{" "}
                          </span>
                        </div>
                        <div className="w-44">
                          {user?.membership?.expiresAt !== undefined &&
                          user?.membership?.expiresAt !== null &&
                          !isMembershipExpired(
                            user?.membership?.expiresAt.toString()
                          )
                            ? convertToEST(
                                user?.membership?.expiresAt?.toString()
                              ).split(" ")[0]
                            : "Not Active"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 items-start text-[12px]">
                      <div className="flex">
                        <div className="w-40 text-start">
                          <span className="text-[#151F2B]">Phone Number:</span>
                        </div>
                        <div className="w-44">{user?.phoneNumber || "N/A"}</div>
                      </div>
                      <div className="flex">
                        <div className="w-40">
                          <span className="text-[#151F2B]">Member Since: </span>
                        </div>
                        <div className="w-44">
                          {
                            convertToEST(
                              user?.createdAt?.toString() as string
                            ).split(" ")[0]
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 px-6 flex flex-col">
              <div className="font-bold text-[17x]">Overview</div>
              <div className="text-[10px] text-gray-400">
                Net Units, Unit Flow, Analytics Data Visualization
              </div>
            </div>
            <div className="bg-[#5886FE] mx-6 my-4 p-4 flex flex-row justify-evenly font-sans">
              <div className={overViewContainer}>
                <div className={overViewHeader}>Net Total</div>
                <div className={overViewNumber}>
                  {currentTotal && currentTotal > 0 ? (
                    <IoIosArrowUp className="pr-2 text-[#3ED36C] animate-pulse" />
                  ) : (
                    <IoIosArrowDown className="pr-2 text-red-500 animate-pulse" />
                  )}
                  ${user && netUnits && currentTotal}
                </div>
              </div>
              <div className={overViewBorder}></div>
              <div className={overViewContainer}>
                <div className={overViewHeader}>This Month</div>
                <div className={overViewNumber}>
                  {currentMonth && currentMonth > 0 ? (
                    <IoIosArrowUp className="pr-2 text-[#3ED36C] animate-pulse" />
                  ) : (
                    <IoIosArrowDown className="pr-2 text-red-500 animate-pulse" />
                  )}
                  ${currentMonth}
                </div>
              </div>
              <div className={overViewBorder}></div>
              <div className={overViewContainer}>
                <div className={overViewHeader}>This Week</div>
                <div className={overViewNumber}>
                  {currentWk && currentWk > 0 ? (
                    <IoIosArrowUp className="pr-2 text-[#3ED36C] animate-pulse" />
                  ) : (
                    <IoIosArrowDown className="pr-2 text-red-500 animate-pulse" />
                  )}
                  ${user && netUnits && currentWk}
                </div>
              </div>
              <div className={overViewBorder}></div>
              <div className={overViewContainer}>
                <div className={overViewHeader}>Unit Size</div>
                <div className={overViewNumber}>${user && user?.unitSize}</div>
              </div>
            </div>
            {/* Make sure daily units are from when user joins */}
            {userUnits && !isLoading && (
              <div className="flex-1 px-6 bg-gray-100">
                <div className="bg-white shadow rounded-lg mb-6">
                  <MyChart units={userUnits} user={user} totalUnits={null} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
