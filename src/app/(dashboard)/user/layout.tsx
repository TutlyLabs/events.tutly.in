import Image from "next/image";
import Link from "next/link";
import React from "react";
const links = [
  {
    id: 1,
    name: "Applications",
    path: "/applications",
  },
  {
    id: 2,
    name: "My Rounds",
    path: "/my-rounds",
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/wishlist",
  },
  {
    id: 4,
    name: "Coding Profiles",
    path: "/coding-profiles",
  },
  {
    id: 5,
    name: "Ratings",
    path: "/ratings",
  },
];
function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between shadow-sm shadow-primary-700 pt-12 top-0 left-0 h-screen">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 p-4 border-b border-slate-500">
            <div>
              <Image
                src="/images/placeholder.jpg"
                className="rounded-full w-12"
                width={100}
                height={100}
                alt="profile"
              />
            </div>
            <div>
              <h1>kalyan_t</h1>
              <h1 className="text-xs">kalyantingani@gmail.com</h1>
            </div>
          </div>
          {links.map((link) => (
            <Link
              href={`/user${link.path}`}
              className="mx-2 hover:bg-primary p-2 px-4 rounded flex items-center gap-2"
              key={link.id}
            >
              <h1>ICON</h1>
              <div className="w-full">{link.name}</div>
            </Link>
          ))}
        </div>
        <div className="mx-4 pb-2">
            <div className="rounded-xl text-center cursor-pointer hover:border-red-500 hover:text-red-500 border w-full p-2">Logout</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
