"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext/userStore";
import "../css/ToolTip.css";
import { GrTooltip } from "react-icons/gr";
import RegistrationForm from "@/components/CompleteRegistrationComps";

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

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  unitSize: number;
  bankroll: number;
  emailNotifs: boolean;
}

const CompleteRegistration: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [userData, setUserData] = React.useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bankroll: 0,
    unitSize: 0,
    emailNotifs: false,
  });

  const { user, isSignedIn, isLoading } = useUser();

  React.useEffect(() => {
    !isLoading && console.log(user);
  }, [user, isLoading]);

  const [updateUser, { data, loading, error }] =
    useMutation(UPDATE_USER_MUTATION);

  const [
    updateTelegramToken,
    { data: tgData, loading: tgLoading, error: tgError },
  ] = useMutation(UPDATE_TOKEN_MUTATION);

  async function completeRegistration() {
    console.log(user, isSignedIn, email);
    const variables: { [key: string]: any } = {};

    if (email) variables.email = email;
    if (userData?.firstName) variables.firstName = userData.firstName;
    if (userData?.lastName) variables.lastName = userData.lastName;
    if (userData?.phoneNumber) variables.phoneNumber = userData.phoneNumber;
    if (userData?.unitSize) variables.unitSize = userData.unitSize;
    if (userData?.bankroll) variables.bankroll = userData.bankroll;
    if (userData?.emailNotifs !== undefined)
      variables.emailNotifs = userData.emailNotifs;

    try {
      console.log(variables);
      await toast.promise(updateUser({ variables }), {
        loading: "Updating your Account...",
        success: () => {
          return "Account Successfully Completed! 🎉";
        },
        error: (error: { message: any }) => {
          return `Something went wrong 😥 Please try again - ${error.message}`;
        },
      });
      router.push("/api/auth/login");
    } catch (err) {
      console.error(error);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    completeRegistration(); // Function to update user data
  };

  const handleDiscordConnect = () => {
    const data = { email };
    const query = new URLSearchParams(data).toString();
    console.log(data, query);

    window.open(`/api/auth/discord?${query}`, "_blank", "noopener,noreferrer");
  };

  const handleTGConnect = async () => {
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
    const telegramUrl = `https://t.me/YourTelegramGroup?start=${token}&email=${encodeURIComponent(
      email
    )}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm
        userData={userData}
        setUserData={setUserData}
        handleSubmit={handleSubmit}
        handleDiscordConnect={handleDiscordConnect}
        handleTGConnect={handleTGConnect}
      />
    </Suspense>
  );
};

export default CompleteRegistration;
