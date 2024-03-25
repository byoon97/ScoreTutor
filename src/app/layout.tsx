import { Inter } from "next/font/google";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GlobalStateProvider } from "./context/store";

import "./globals.css";
import Nav from "@/components/Global/NavBar/Nav";
import Footer from "@/components/Global/Footer/Index";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalStateProvider>
        <UserProvider>
          <ApolloWrapper>
            <body className={inter.className}>
              {" "}
              <Nav />
              {children} <Footer />
            </body>
          </ApolloWrapper>
        </UserProvider>
      </GlobalStateProvider>
    </html>
  );
}
