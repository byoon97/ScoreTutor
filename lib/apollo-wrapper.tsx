"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

export function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/graphql"
        : "https://scoretutor.vercel.app" + "/api/graphql",
  });

  const link = ApolloLink.from([httpLink]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
