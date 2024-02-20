"use client";
import Modal from "react-modal";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
  email: string;
}

type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      firstName
      lastName
      phoneNumber
    }
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function RegisterModal({
  setIsOpen,
  modalIsOpen,
  email,
}: Props) {
  const [user, setUser] = React.useState<Credentials>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

  async function closeModal() {
    await updateUser({
      variables: {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
    });
    setIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false} // Opting out
      >
        <div className="text-black">
          <h2 className="text-center text-xl font-bold">
            Complete Registration
          </h2>
          <form className="w-full max-w-xl rounded-lg shadow-md p-6">
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
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({
                      firstName: e.target.value,
                      lastName: user.lastName,
                      phoneNumber: user.phoneNumber,
                    })
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
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({
                      firstName: user.firstName,
                      lastName: e.target.value,
                      phoneNumber: user.phoneNumber,
                    })
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
                  value={user.phoneNumber}
                  onChange={(e) =>
                    setUser({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <div
                  onClick={closeModal}
                  className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                >
                  Complete Registration
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
