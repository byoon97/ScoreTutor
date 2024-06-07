"use client";
// context/UserContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserProps } from "@/types";
import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";
import { gql, useQuery } from "@apollo/client";

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

interface UserContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  isLoading: boolean;
  error: Error | null;
  isSignedIn: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    user: auth0User,
    isLoading: auth0Loading,
    error: auth0Error,
  } = useAuth0User();
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log("Auth0 user:", auth0User);
  }, [auth0User]);

  const {
    loading: gqlLoading,
    error: gqlError,
    data: userData,
    refetch,
  } = useQuery(GET_USER_QUERY, {
    variables: { email: auth0User?.email ?? "" },
    skip: !auth0User?.email,
  });

  // Debugging log to check GraphQL query state
  useEffect(() => {
    console.log("GraphQL loading:", gqlLoading);
    console.log("GraphQL error:", gqlError);
    console.log("GraphQL userData:", userData);
  }, [gqlLoading, gqlError, userData]);

  useEffect(() => {
    if (auth0User) {
      refetch(); // Ensure the query runs again if auth0User becomes available
    }
  }, [auth0User, refetch]);

  useEffect(() => {
    if (!gqlLoading && userData) {
      if (userData.getUserByEmail) {
        setUser(userData.getUserByEmail);
        setIsSignedIn(true);
        setIsLoading(false);
      } else {
        setError(new Error("User not found"));
        setIsSignedIn(false);
        setIsLoading(false);
      }
    } else if (auth0Error || gqlError) {
      setError(auth0Error ?? gqlError ?? null);
      setIsSignedIn(false);
      setIsLoading(false);
    } else if (!auth0User && !auth0Loading) {
      setIsSignedIn(false);
      setIsLoading(false);
    }
  }, [auth0User, auth0Loading, auth0Error, gqlLoading, gqlError, userData]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, error, isSignedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
