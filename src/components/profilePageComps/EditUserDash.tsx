import React from "react";
import { UserProps } from "@/types";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $unitSize: Int!
    $bankroll: Int!
    $emailNotifs: Boolean!
    $password: String!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      unitSize: $unitSize
      bankroll: $bankroll
      emailNotifs: $emailNotifs
      password: $password
    ) {
      email
      firstName
      lastName
      phoneNumber
      unitSize
      bankroll
      emailNotifs
      password
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
  password: string;
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
    password: "",
  });

  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

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
    if (userData?.password) variables.password = userData.password;

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

  return (
    <div className="w-full rounded-lg p-2 flex flex-col">
      <Toaster />
      <div className="py-4 flex flex-col">
        <div className="font-bold text-[17x]">Your Settings</div>
        <div className="text-[10px] text-gray-400">Edit Information</div>
      </div>
      <div className="w-full xl:w-2/3">
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
                <label htmlFor="email" className={inputLabel}>
                  Email
                </label>
                <input
                  className={inputClass}
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="password" className={inputLabel}>
                  Password
                </label>
                <input
                  className={inputClass}
                  id="password"
                  type="password"
                  placeholder="new password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>

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
    </div>
  );
};

export default EditUserModal;
