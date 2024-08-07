"use client";
import { User } from "@/types/user";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import { RxDashboard } from "react-icons/rx";
import { SiCodeforces } from "react-icons/si";
import { PiCodeBold } from "react-icons/pi";
import { MdOutlineQueryStats } from "react-icons/md";


export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const items = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
    },
    {
      name: "Contests",
      icon: <SiCodeforces />,
      path: "/upcoming_contests",
    },
    {
      name: "Coding Profiles",
      icon: <PiCodeBold />,
      path: "/codingProfiles",
    },
    {
      name: "Statistics",
      icon: <MdOutlineQueryStats />,
      path: "/ratings",
    },
    {
      name: "Hackathons",
      icon: <MdOutlineQueryStats />,
      path: "/hackathon",
    },
  ];
  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
      <div className="flex">
        <Sidebar items={items} menu={menu} setMenu={setMenu} />
        <Suspense fallback={<Loading />}>
          <div
            className={`w-full ${menu ? "sm:pl-48" : "sm:pl-20"}`}
          >
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}