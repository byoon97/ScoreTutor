import React from "react";
import { UserProps } from "@/types";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";

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
      email
      firstName
      lastName
      phoneNumber
      unitSize
      bankroll
      emailNotifs
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

  async function completeRegistration() {
    const variables = {
      email: user?.email,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      unitSize: userData?.unitSize,
      bankroll: userData?.bankroll,
      emailNotifs: userData?.emailNotifs,
    };
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
