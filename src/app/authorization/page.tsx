"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";

type Props = {};

type Credentials = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

const Authorization = (props: Props) => {
  const router = useRouter();
  const { user: auth0User, isLoading } = useUser();
  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

  const [user, setUser] = React.useState<Credentials>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleCompletion = async () => {};

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <Link href="/">
            {" "}
            <Image src="/image.png" alt="logo" width="100" height="100" />
          </Link>
        </div>
        <h2 className="text-4xl tracking-tight">
          Complete Account Registration
        </h2>
        <span className="text-sm">
          or {/* change to login link here */}
          <Link href="/register">
            <div className="text-blue-500">Sign In to an Existing Account</div>
          </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
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
              <Link
                href="/"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500 text-center"
              >
                Complete Registration
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
