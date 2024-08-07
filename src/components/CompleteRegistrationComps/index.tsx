import React from "react";
import { useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { GrTooltip } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitSize: number;
  bankroll: number;
  emailNotifs: boolean;
}

interface formProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, email: string) => void;
  handleDiscordConnect: (email: string) => void;
  handleTGConnect: (email: string) => void;
}

const RegistrationForm: React.FC<formProps> = ({
  userData,
  setUserData,
  handleSubmit,
  handleDiscordConnect,
  handleTGConnect,
}) => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

  return (
    <div className="flex flex-col items-center justify-center bg-white pt-6">
      <Toaster />
      <div className="text-center">
        <h2 className="text-3xl tracking-tight text-black font-sans">
          Complete Your Registration
        </h2>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white p-6"
          onSubmit={(e) => handleSubmit(e, email)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                value={userData.phoneNumber}
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
                }
                required
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6 relative group">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="number"
              >
                <span>Unit Size</span>
                <div className="relative inline-block ml-2">
                  <GrTooltip />

                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 -translate-x-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                    How much you are willing to risk per unit. This value should
                    be 1-2% of your bankroll.
                  </div>
                </div>
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="number"
                value={userData.unitSize}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    unitSize: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6 relative group">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="number"
              >
                Bankroll
                <div className="relative inline-block ml-2">
                  <GrTooltip />

                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 -translate-x-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                    Your total bankroll that you are trying to increase
                    gradually.
                  </div>
                </div>
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="number"
                value={userData.bankroll}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    bankroll: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Receive Email Notifications
              </p>

              <label
                htmlFor="True"
                className="block text-gray-700 text-[13px] pb-1"
              >
                <input
                  id="True"
                  type="radio"
                  value="true"
                  name="emailNotifications"
                  className="mr-2"
                  onChange={(e) =>
                    setUserData({ ...userData, emailNotifs: true })
                  }
                />
                I&apos;d like to receive email notifications
              </label>
              <label
                htmlFor="False"
                className="block text-gray-700 text-[13px]"
              >
                <input
                  id="False"
                  type="radio"
                  value="false"
                  name="emailNotifications"
                  className="mr-2"
                  onChange={(e) =>
                    setUserData({ ...userData, emailNotifs: false })
                  }
                />
                Opt Out
              </label>
            </div>
            <div className="w-full md:w-full px-3 mb-2">
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                type="submit"
              >
                Register
              </button>
            </div>

            <div className="mx-auto -mb-6 pb-2">
              <span className="text-center text-xs text-gray-700">
                Link Your Socials
              </span>
            </div>
            <div className="flex items-center w-full mt-2">
              <div className="w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400">
                <div className="appearance-none flex items-center justify-center  w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                  <FaDiscord
                    size={28}
                    onClick={() => handleDiscordConnect(email)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 pt-4 mx-2">
                <div className="appearance-none flex items-center justify-center  w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                  <FcGoogle size={28} />
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 pt-4 mx-2 border-t border-gray-400">
                <div
                  className="appearance-none flex items-center justify-center  w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none"
                  onClick={() => handleTGConnect(email)}
                >
                  <FaTelegram size={28} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
