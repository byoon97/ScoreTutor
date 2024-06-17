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

type days = {
  date: Date;
  netUnits: number;
};

const Page: React.FC = () => {
  const { isLoading, isSignedIn, user } = useUser();
  const { loading, error, data: units } = useQuery(GET_DAILY_UNITS);
  const { loading: totalLoad, data: netUnits } = useQuery(GET_TOTAL_UNITS);
  const [userUnits, setUserUnits] = React.useState();
  const [hasFiltered, setHasFiltered] = React.useState<boolean>(false);
  const [editModal, toggleEditModal] = React.useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !loading && !hasFiltered) {
      const userCreatedAt = user?.createdAt
        ? new Date(user.createdAt)
        : undefined;

      if (userCreatedAt) {
        const filteredDays = units.getDailyUnits.filter(
          (day: { date: string }) => isAfter(new Date(day.date), userCreatedAt)
        );
        setUserUnits(filteredDays);
        setHasFiltered(true); // Set hasFiltered to true to prevent re-execution
      }
    }

    !totalLoad && console.log(netUnits);
  }, [units, user, isLoading, loading, hasFiltered, totalLoad, netUnits]);
  const openModal = () => {
    toggleEditModal(true);
  };

  const closeModal = () => {
    toggleEditModal(false);
  };

  return (
    <div className="bg-[#F6F7FB]">
      {" "}
      <div className=" p-2 xl:mx-80 xl:py-8">
        <div className="flex flex-col w-full">
          <h1 className=" text-black text-center p-4 font-mono">Profile</h1>
          <div className="border-b-[1px] border-black shadow-b-lg mb-6 lg:mx-64 mx-20"></div>
        </div>
        {isLoading && !user ? (
          <div>loading</div>
        ) : (
          <div className="bg-white text-black p-4 rounded-lg shadow-lg my-2 flex flex-row justify-between xl:p-8">
            <EditUserModal
              isOpen={editModal}
              closeModal={closeModal}
              user={user}
            />
            <Toaster />
            <div className="flex flex-col w-full">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="text-[12px] lg:text-[14px] font-mono flex-grow">
                  <div className="flex">
                    <div className="w-52">
                      <span className="text-[#151F2B]">Name:</span>
                    </div>
                    <div className="w-36">
                      {user?.firstName} {user?.lastName}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-52">
                      <span className="text-[#151F2B]">Email : </span>
                    </div>
                    <div className="w-36">{user?.email}</div>
                  </div>{" "}
                  <div className="flex">
                    <div className="w-52">
                      <span className="text-[#151F2B]">
                        Recieve Email Notifs :{" "}
                      </span>
                    </div>
                    <div className="w-36">Yes</div>
                  </div>
                  <div className="flex">
                    <div className="w-52">
                      <span className="text-[#151F2B]">Active Member: </span>
                    </div>
                    <div className="w-36">
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
                <div className="text-[12px] font-mono">
                  <div className="flex">
                    <div className="text-[#151F2B] w-52 md:w-24">
                      Bankroll :{" "}
                    </div>

                    <div>
                      $
                      {user &&
                        netUnits &&
                        user?.bankroll +
                          user?.unitSize * netUnits.getUnitCount[0].netUnits}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="text-[#151F2B] w-52 md:w-24">
                      Unit Size :{" "}
                    </div>

                    <div>${user && user.unitSize}</div>
                  </div>
                  <div className="flex">
                    <div className="text-[#151F2B] w-52 md:w-24">
                      Net Units :
                    </div>

                    <div>{netUnits.getUnitCount[0].netUnits.toFixed(2)}</div>
                  </div>
                </div>
              </div>{" "}
              <div className="edit flex items-center justify-center mt-6 mb-4">
                <button
                  className="rounded-lg shadow-lg bg-[#DCF2F2] font-mono w-20 text-xs h-6"
                  onClick={openModal}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* make sure daily units are from when user joins */}
        {userUnits && !isLoading && <MyChart units={userUnits} user={user} />}
      </div>
    </div>
  );
};

export default Page;
