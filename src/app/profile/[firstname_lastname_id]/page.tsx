"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@/app/context/UserContext/userStore";
import MyChart from "@/components/profilePageComps/Chart";
import { isBefore, isAfter, isEqual, compareAsc } from "date-fns";
import { isMembershipExpired } from "@/util/profileUtil";
import { convertToEST } from "@/util/getDate";
import { Toaster } from "react-hot-toast";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";
import {
  UnitData,
  getDataForCurrentMonth,
  getDataForCurrentYear,
  getDataForMostRecent,
} from "@/util/chartUtil";
import Link from "next/link";
import EditUserModal from "@/components/profilePageComps/EditUserDash";
import Calendar from "@/components/historyComponents/Calendar";

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
  const [userUnits, setUserUnits] = React.useState<UnitData[]>();
  const [hasFiltered, setHasFiltered] = React.useState<boolean>(false);
  const [currentWk, setCurrentWk] = React.useState<number | undefined>(
    undefined
  );
  const [currentMonth, setCurrentMonth] = React.useState<number | undefined>(
    undefined
  );
  const [currentYear, setCurrentYear] = React.useState<number | undefined>(
    undefined
  );
  const [currentTotal, setCurrentTotal] = React.useState<number | undefined>(
    undefined
  );
  const [dashboard, setDashboard] = React.useState<string>("profile");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (!isLoading && !loading && !hasFiltered) {
    const userCreatedAt = user?.createdAt
      ? new Date(user.createdAt)
      : undefined;

    if (userCreatedAt) {
      const filteredDays: UnitData[] = units.getDailyUnits.filter(
        (day: { date: string | number | Date }) =>
          isAfter(new Date(day.date), userCreatedAt)
      );
      setUserUnits(filteredDays);
      setHasFiltered(true); // Set hasFiltered to true to prevent re-execution
    }
  }

  useEffect(() => {
    console.log(userUnits?.length, userUnits);

    if (userUnits && user && hasFiltered) {
      const length = userUnits.length;
      const total =
        user.unitSize *
        userUnits.reduce((partialSum, unit) => partialSum + unit.netUnits, 0);

      if (length === 0) {
        console.log(1);
        setCurrentTotal(0);
        setCurrentWk(0);
        setCurrentMonth(0);
      } else {
        if (length === 1) {
          console.log(2);
        } else {
          console.log(3);
          setCurrentTotal(total);
        }

        let mostRecentArr = getDataForMostRecent(userUnits);
        let mostRecentMonth = getDataForCurrentMonth(userUnits);
        let currentYear = getDataForCurrentYear(userUnits);

        const mostRecentValue = mostRecentArr[mostRecentArr.length - 1];
        const currentMonthValue = mostRecentMonth[mostRecentMonth.length - 1];
        const currentYearValue = currentYear[currentYear.length - 1];

        setCurrentWk(Number(mostRecentValue.toFixed(2)) * user.unitSize);
        setCurrentMonth(Number(currentMonthValue.toFixed(2)) * user.unitSize);
        setCurrentYear(Number(currentYearValue.toFixed(2)) * user.unitSize);
      }
    }
  }, [netUnits, units, user, userUnits, hasFiltered]);

  return (
    <div className="bg-[#F6F7FB] h-full font-sans leading-tighter">
      {isLoading && !user ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row text-black w-full">
          <div className="bg-gray-800 text-white space-y-6 md:flex p-4">
            <nav className="flex flex-col space-y-4 text-[13px]">
              <div
                className="flex items-center space-x-2 hover:text-gray-300 w-full"
                onClick={() => setDashboard("profile")}
              >
                <FaUser />
                <div className="flex flex-row justify-between items-center w-full">
                  {" "}
                  <span>Profile</span>
                  <IoIosArrowForward />
                </div>
              </div>
              <div
                className="flex items-center space-x-2 hover:text-gray-300 w-full"
                onClick={() => setDashboard("settings")}
              >
                <FaCog />
                <div className="flex flex-row justify-between items-center w-full">
                  <span>Settings</span>
                  <IoIosArrowForward />
                </div>
              </div>
              <Link href="/api/auth/logout">
                <div className="flex items-center space-x-2 hover:text-gray-300 w-full">
                  <FaSignOutAlt />
                  <div className="flex flex-row justify-between items-center w-full">
                    <span>Logout</span>
                    <IoIosArrowForward />
                  </div>
                </div>
              </Link>
            </nav>
          </div>
          {dashboard == "profile" && (
            <div className="flex flex-col px-2 w-full">
              <div className="py-4 flex flex-col">
                <div className="font-bold text-[17x]">Dashboard</div>
                <div className="text-[10px] text-gray-400">
                  Profile/Units Current
                </div>
              </div>
              <div className="flex-1 bg-gray-100 w-full">
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
                          <div className="w-32 text-start">
                            <span className="text-[#151F2B]">Email:</span>
                          </div>
                          <div className="w-44 text-[#45A29F]">
                            {user?.email}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-32">
                            <span className="text-[#151F2B]">
                              Email Alerts:
                            </span>
                          </div>
                          <div className="w-44">
                            {user?.emailNotifs ? "Enabled" : "Disabled"}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-32">
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
                          <div className="w-32 text-start">
                            <span className="text-[#151F2B]">
                              Phone Number:
                            </span>
                          </div>
                          <div className="w-44">
                            {user?.phoneNumber || "N/A"}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-32">
                            <span className="text-[#151F2B]">
                              Member Since:{" "}
                            </span>
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
              <div className="pt-4 flex flex-col">
                <div className="font-bold text-[17x]">Overview</div>
                <div className="text-[10px] text-gray-400">
                  Net Units, Unit Flow, Analytics Data Visualization
                </div>
              </div>
              {/* SMALL SCREEN BAR */}
              {/* SMALL SCREEN BAR */}
              {/* SMALL SCREEN BAR */}
              {/* SMALL SCREEN BAR */}
              <div className="bg-[#5886FE] my-4 p-4 flex flex-row justify-evenly font-sans md:hidden">
                <div className={overViewContainer}>
                  <div className={overViewHeader}>Net Total</div>
                  <div className={overViewNumber}>
                    {currentTotal && currentTotal > 0 ? (
                      <IoIosArrowUp className="pr-2 animate-pulse text-green-500" />
                    ) : (
                      <IoIosArrowDown className="pr-2 text-red-500 animate-pulse" />
                    )}

                    {user && formatter.format(Number(currentTotal))}
                  </div>
                </div>
                <div className={overViewBorder}></div>
                <div className={overViewContainer}>
                  <div className={overViewHeader}>Unit Size</div>
                  <div className={overViewNumber}>
                    {user && formatter.format(user?.unitSize)}
                  </div>
                </div>
              </div>
              {/* MD AND UP */}
              {/* MD AND UP */}
              {/* MD AND UP */}
              {/* MD AND UP */}
              <div className="hidden md:block">
                {" "}
                <div className="bg-[#5886FE] my-4 p-4 flex flex-row justify-evenly font-sans">
                  <div className={overViewContainer}>
                    <div className={overViewHeader}>Net Total</div>
                    <div className={overViewNumber}>
                      {currentTotal && currentTotal > 0 ? (
                        <IoIosArrowUp className="pr-2 text-[#3ED36C] animate-pulse" />
                      ) : (
                        <IoIosArrowDown className="pr-2 text-red-500 animate-pulse" />
                      )}

                      {user && formatter.format(Number(currentTotal))}
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
                      {formatter.format(Number(currentMonth))}
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
                      {user && formatter.format(Number(currentWk))}
                    </div>
                  </div>
                  <div className={overViewBorder}></div>
                  <div className={overViewContainer}>
                    <div className={overViewHeader}>Unit Size</div>
                    <div className={overViewNumber}>
                      {user && formatter.format(user?.unitSize)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Make sure daily units are from when user joins */}
              {userUnits && !isLoading && (
                <div className="flex-1 bg-gray-100 w-full">
                  <div className="bg-white shadow rounded-lg mb-6">
                    <MyChart units={userUnits} user={user} totalUnits={null} />
                  </div>
                </div>
              )}
              {userUnits && !isLoading && (
                <div className="mb-2">
                  <Calendar dailyUnits={userUnits} user={user} />
                </div>
              )}
            </div>
          )}
          {dashboard == "settings" && <EditUserModal user={user} />}
        </div>
      )}
    </div>
  );
};

export default Page;

