"use client";
import { User } from "@/types/user";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import Navbar from "../navbar/Navbar";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineQueryStats } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";


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
      name: "Home",
      icon: <RxDashboard />,
      path: "/",
    },
    {
      name: "Profile",
      icon: <HiUserGroup />,
      path: "/user/coding-profiles",
    },
    {
      name: "CP",
      icon: <MdOutlineQueryStats />,
      path: "/cp"
    }
  ];
  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} items={items} />
      {/* <div className="flex"> */}
        {/* <Sidebar items={items} menu={menu} setMenu={setMenu} /> */}
        <Suspense fallback={<Loading />}>
          <div
            className={`w-full`}
          >
            {children}
          </div>
        </Suspense>
      {/* </div> */}
    </div>
  );
}