/* eslint-disable @next/next/no-img-element */
"use client";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext/userStore";

interface Props {}

type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitSize: number;
  bankroll: number;
};

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $unitSize: Int!
    $bankroll: Int!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      unitSize: $unitSize
      bankroll: $bankroll
    ) {
      firstName
      lastName
      phoneNumber
      unitSize
      bankroll
    }
  }
`;

const Success: React.FC<Props> = () => {
  const {
    user: userData,
    isLoading,
    error: globalError,
    isSignedIn,
  } = useUser();
  const router = useRouter();
  const [user, setUser] = React.useState<Credentials>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bankroll: 0,
    unitSize: 0,
  });

  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

  async function completeRegistration() {
    const variables = {
      email: userData?.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      unitSize: user.unitSize,
      bankroll: user.bankroll,
    };
    try {
      const updatedUser = await toast
        .promise(updateUser({ variables }), {
          loading: "Creating your Account...",
          success: () => {
            return "Membership Successfully Completed! 🎉";
          },
          error: (error: { message: any }) => {
            return `Something went wrong 😥 Please try again - ${error.message}`;
          },
        })
        .then((response) => response && router.push("/"));
      console.log(updatedUser);
    } catch (err) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="bg-white p-6 md:mx-auto">
        <div className="w-16 h-16 mx-auto my-4 text-green-600">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          {userData?.bankroll ? (
            <div>
              <p>Have a great day!</p>
              <div className="py-10">
                <a
                  href="/"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </a>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-black">
                Please fill out some additional information for us below!
              </p>{" "}
              <div className="flex items-center justify-center flex-col bg-white">
                <div className="flex justify-center my-2 mx-4 md:mx-0">
                  <form className="w-full max-w-xl bg-white p-6">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-full px-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="Password"
                        >
                          First Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                          type="first name"
                          value={user.firstName}
                          onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="Password"
                        >
                          Last Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                          type="last name"
                          value={user.lastName}
                          onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="Password"
                        >
                          Phone Number
                        </label>
                        <input
                          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                          type="phone number"
                          value={user.phoneNumber}
                          onChange={(e) =>
                            setUser({ ...user, phoneNumber: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="Password"
                        >
                          Unit Size
                        </label>
                        <input
                          type="number"
                          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                          value={user.unitSize}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              unitSize: Number(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="Password"
                        >
                          Bankroll
                        </label>
                        <input
                          type="number"
                          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                          value={user.bankroll}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              bankroll: Number(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <button
                          onClick={completeRegistration}
                          className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          Complete Registration
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <p className=" text-gray-900 text-center">
                We use your unit size and bankroll to keep track of your
                winnings and losses for you. Keep track of your bankroll history
                on your profile page!
              </p>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Success;
