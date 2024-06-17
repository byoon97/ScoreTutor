import React from "react";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
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
  isOpen: boolean;
  closeModal: () => void;
  user: UserProps | null;
}

type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitSize: number;
  bankroll: number;
  emailNotifs: boolean;
};

const inputClass =
  "border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500";
const inputLabel = "font-medium mb-1";

const EditUserModal: React.FC<EditUserProps> = ({
  isOpen,
  closeModal,
  user,
}) => {
  const [userData, setUserData] = React.useState<Credentials>({
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="flex items-center justify-center p-4 font-mono text-sm mt-16"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-lg relative space-y-6">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 focus:outline-none"
        >
          <IoIosClose color="red" size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form action="submit" className="flex flex-col space-y-4">
          <label htmlFor="FirstName" className="flex flex-col">
            <span className={inputLabel}>First Name</span>
            <input
              id="FirstName"
              type="text"
              className={inputClass}
              placeholder={user?.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </label>
          <label htmlFor="LastName" className="flex flex-col">
            <span className={inputLabel}>Last Name</span>
            <input
              id="LastName"
              type="text"
              className={inputClass}
              placeholder={user?.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </label>
          <label htmlFor="Bankroll" className="flex flex-col">
            <span className={inputLabel}>Bankroll</span>
            <input
              id="Bankroll"
              type="number"
              className={inputClass}
              placeholder={user?.bankroll?.toString()}
              onChange={(e) =>
                setUserData({ ...userData, bankroll: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="UnitSize" className="flex flex-col">
            <span className={inputLabel}>Unit Size</span>
            <input
              id="UnitSize"
              type="number"
              className={inputClass}
              placeholder={user?.unitSize?.toString()}
              onChange={(e) =>
                setUserData({ ...userData, unitSize: Number(e.target.value) })
              }
            />
          </label>
          <p className="font-medium mt-4">Receive Email Notifications</p>
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-6">
            <label htmlFor="True" className="flex items-center mb-1">
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
            <label htmlFor="False" className="flex items-center">
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
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-6 transition-transform transform hover:scale-105"
            onClick={completeRegistration}
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
