import { Inter, Merriweather_Sans } from "next/font/google";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GlobalStateProvider } from "./context/store";
import { UserProvider as UserState } from "./context/UserContext/userStore";
import "./globals.css";
import Nav from "@/components/Global/NavBar/Nav";
import Footer from "@/components/Global/Footer/Index";

const inter = Inter({ subsets: ["latin"] });
const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
            <UserState>
              <body
                className={`${inter.className} ${merriweatherSans.variable}`}
              >
                <Nav />
                {children} <Footer />
              </body>
            </UserState>
          </ApolloWrapper>
        </UserProvider>
      </GlobalStateProvider>
    </html>
  );
}
