import { Inter } from "next/font/google";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";
import Nav from "@/components/NavBar/Nav";
import Footer from "@/components/Footer/Index";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ApolloWrapper>
          <body className={inter.className}>
            {" "}
            <Nav />
            {children} <Footer />
          </body>
        </ApolloWrapper>
      </UserProvider>
    </html>
  );
}
