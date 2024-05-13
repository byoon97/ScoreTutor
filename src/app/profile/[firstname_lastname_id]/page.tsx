"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Graph from "@/components/profilePageComps/Graph";

export const GET_USER_QUERY = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      firstName
      lastName
      phoneNumber
      bankroll
      unitSize
    }
  }
`;

const Page: React.FC = () => {
  const { user } = useUser();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  useEffect(() => {
    data && console.log(data);
  }, [data, loading]);

  return (
    <div className="bg-[#F6F7FB] p-2">
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="bg-white text-black p-2 rounded-lg shadow-lg m-2 my-2">
          <div>
            {data?.getUserByEmail.firstName} {data?.getUserByEmail.lastName}
          </div>
          <div>Email : {data?.getUserByEmail.email}</div>
          <div>Active Member : Yes</div>
          <div>User Since : Feburary 14th, 2024</div>
        </div>
      )}
      <div className="flex items-center justify-center p-2">
        <Graph user={data} />
      </div>
    </div>
  );
};

export default Page;
