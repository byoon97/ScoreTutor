import React from "react";
import { UserProps } from "@/types";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $unitSize: Int!
    $bankroll: Int!
    $emailNotifs: Boolean!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      unitSize: $unitSize
      bankroll: $bankroll
      emailNotifs: $emailNotifs
    ) {
      firstName
      lastName
      phoneNumber
      unitSize
      bankroll
      emailNotifs
    }
  }
`;

const UPDATE_TOKEN_MUTATION = gql`
  mutation UpdateTelegramToken($email: String!, $telegramToken: String!) {
    updateTelegramToken(email: $email, telegramToken: $telegramToken) {
      email
      telegramToken
    }
  }
`;

interface EditUserProps {
  user: UserProps | null;
}

type Credentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitSize: number;
  bankroll: number;
  emailNotifs: boolean;
};

const inputClass =
  "border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm";
const inputLabel = "block text-gray-700";

const EditUserModal: React.FC<EditUserProps> = ({ user }) => {
  const [userData, setUserData] = React.useState<Credentials>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bankroll: 0,
    unitSize: 0,
    emailNotifs: false,
  });

  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

  const [
    updateTelegramToken,
    { data: tgData, loading: tgLoading, error: tgError },
  ] = useMutation(UPDATE_TOKEN_MUTATION);

  async function completeRegistration() {
    const variables: { [key: string]: any } = {};

    if (user?.email) variables.email = user.email;
    if (userData?.firstName) variables.firstName = userData.firstName;
    if (userData?.lastName) variables.lastName = userData.lastName;
    if (userData?.phoneNumber) variables.phoneNumber = userData.phoneNumber;
    if (userData?.unitSize) variables.unitSize = userData.unitSize;
    if (userData?.bankroll) variables.bankroll = userData.bankroll;
    if (userData?.emailNotifs !== undefined)
      variables.emailNotifs = userData.emailNotifs;
    try {
      await toast.promise(updateUser({ variables }), {
        loading: "Updating your Account...",
        success: () => {
          return "Account Successfully Completed! 🎉";
        },
        error: (error: { message: any }) => {
          return `Something went wrong 😥 Please try again - ${error.message}`;
        },
      });
    } catch (err) {
      console.error(error);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    completeRegistration(); // Function to update user data
  };

  const handleDiscordConnect = () => {
    const email = user?.email;
    if (email) {
      const data = { email };
      const query = new URLSearchParams(data as Record<string, string>);

      window.open(
        `/api/auth/discord?${query.toString()}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      console.error("Email is missing");
    }
  };

  const handleTGConnect = async () => {
    const email = user?.email;

    function generateToken() {
      return Math.random().toString(36).substring(2, 8);
    }

    const token = generateToken();

    const variables = {
      email,
      token,
    };

    // update user DB here
    await toast.promise(updateTelegramToken({ variables }), {
      loading: "Sending you to our channel",
      success: () => {
        return "Token Successfully Created! 🎉";
      },
      error: (error: { message: any }) => {
        return `Something went wrong 😥 Please try again - ${error.message}`;
      },
    });

    if (email) {
      const telegramUrl = `https://t.me/YourTelegramGroup?start=${token}&email=${encodeURIComponent(
        email.toString()
      )}`;
      window.open(telegramUrl, "_blank");
    }
  };

  return (
    <div className="w-full rounded-lg p-2 flex flex-col lg:flex-row">
      <Toaster />
      <div className="flex flex-col w-full lg:w-2/3 pr-4">
        {" "}
        <div className="py-4 flex flex-col">
          <div className="font-bold text-[17x]">Your Settings</div>
          <div className="text-[10px] text-gray-400">Edit Information</div>
        </div>
        <div className="card bg-white shadow-sm p-6 rounded-lg mb-2">
          <form action={"submit"}>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="first_name" className={inputLabel}>
                  First Name
                </label>
                <input
                  className={inputClass}
                  id="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="last_name" className={inputLabel}>
                  Last Name
                </label>
                <input
                  className={inputClass}
                  id="last_name"
                  type="text"
                  placeholder="Also your last name"
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="phone" className={inputLabel}>
                  Phone
                </label>
                <input
                  className={inputClass}
                  id="phone"
                  type="number"
                  placeholder="+12-345 678 910"
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="bankroll" className={inputLabel}>
                  Bankroll
                </label>
                <input
                  className={inputClass}
                  id="bankroll"
                  type="number"
                  placeholder="$500"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      bankroll: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="unitsize" className={inputLabel}>
                  unitsize
                </label>
                <input
                  className={inputClass}
                  id="unitsize"
                  type="number"
                  placeholder="$500"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      unitSize: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-3">
                <p className="text-gray-700 pb-1">
                  Receive Email Notifications
                </p>

                <label
                  htmlFor="True"
                  className="block text-gray-700 text-[12px] pb-1"
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
                  className="block text-gray-700 text-[12px]"
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
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="border-[1px] px-4 py-2 rounded-lg shadow-lg text-sm bg-sky-500 hover:bg-sky-200"
                onClick={handleSubmit}
              >
                Save All
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/3 h-full">
        {" "}
        <div className="py-4 flex flex-col">
          <div className="font-bold text-[17x]">Connections</div>
          <div className="text-[10px] text-gray-400">Link Your Socials</div>
        </div>
        <div className="card bg-white shadow-sm py-6 rounded-lg mb-2">
          <div className="flex w-full mt-2 flex-col space-y-6">
            <div className="flex flex-row space-apart items-center">
              <div className="w-full  px-3 mx-2 flex flex-row items-center">
                <FaDiscord size={32} color={"4A55CA"} />
                <div className="flex flex-col pl-4">
                  <div className="text-[14px]">Discord</div>
                  <div className="text-[10px] text-gray-400">
                    {user?.discordId ? "Connected" : "Not Connected"}
                  </div>
                </div>
              </div>
              <div className="mr-4 text-xs border-[1px] border-gray-200 py-2 px-4 rounded-lg hover:border-blue-300 cursor-pointer">
                {user?.discordId ? (
                  "x"
                ) : (
                  <div onClick={handleDiscordConnect}>Link</div>
                )}
              </div>
            </div>
            <div className="flex flex-row space-apart items-center">
              <div className="w-full  px-3 mx-2 flex flex-row items-center">
                <FaTelegram size={32} color={"319ED7"} />
                <div className="flex flex-col pl-4">
                  <div className="text-[14px]">Telegram</div>
                  <div className="text-[10px] text-gray-400 w-full">
                    {user?.telegramId ? "Connected" : "Not Connected"}
                  </div>
                </div>
              </div>
              <div className="mr-4 text-xs border-[1px] border-gray-200 py-2 px-4 rounded-lg hover:border-blue-300 cursor-pointer">
                {user?.discordId ? (
                  "x"
                ) : (
                  <div onClick={handleTGConnect}>Link</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
