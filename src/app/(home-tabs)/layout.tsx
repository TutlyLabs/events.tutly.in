import "@/styles/globals.css";
import type { Metadata } from "next";
import HomeLayout from "@/components/layouts/home-layout";
import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@/types/user";
import { DiVim } from "react-icons/di";
import Link from "next/link";
import Tabs from "@/components/tabs";

export const metadata: Metadata = {
  title: "Events",
  description: "Tutly",
};

const tabs = [
  {
    name: "Hackathons",
    href: "/hackathon",
  },
  {
    name: "Contests",
    href: "/contests",
  },
  {
    name: "Workshops",
    href: "/workshops",
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <HomeLayout currentUser={currentUser as User}>
        <Tabs tabs={tabs}/>
        <div>{children}</div>
      </HomeLayout>
    </div>
  );
}
