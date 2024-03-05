"use client";
import React, { FC } from "react";
import GameBar from "@/components/NavBar/GameBar";
import Nav from "@/components/NavBar/Nav";
import Content from "@/components/Content/Index";
import Picks from "@/components/Picks/Index";
import Footer from "@/components/Footer/Index";
import HomeCarousel from "@/components/HomeCarousel/Index";
import { useUser } from "@auth0/nextjs-auth0/client";
import { gql, useQuery } from "@apollo/client";
import RegisterModal from "@/components/RegisterModal";

const GET_USER_QUERY = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

const Home: FC = () => {
  const { user } = useUser();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { email: user?.email },
    skip: !user,
  });

  React.useEffect(() => {
    if (!user) {
      setIsOpen(false);
    } else if (data?.getUserByEmail?.firstName) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [user, data, loading, error]);

  return (
    <div className="bg-white text-black flex flex-col px-2">
      {/* <GameBar /> */}

      <RegisterModal
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        email={data?.getUserByEmail?.email}
      />

      <div className="md:hidden flex items-center flex-col">
        {" "}
        <div className="px-2 h-full w-full">
          <HomeCarousel />
        </div>
        <Content />
      </div>

      <div className="hidden lg:hidden md:flex md:flex-col md:justify-between">
        <HomeCarousel />
        <Content />
      </div>

      <div className="hidden md:hidden lg:flex md:flex-row lg:my-8 lg:items-center lg:justify-center md:mb-16 lg:mx-20 2xl:mx-40">
        <HomeCarousel />
        <Content />
      </div>
      <Picks />
    </div>
  );
};

export default Home;
