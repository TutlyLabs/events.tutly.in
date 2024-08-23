"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

function Tabs({ tabs }: { tabs: { name: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <div className="max-w-2xl mx-auto mt-5 p-2 bg-white rounded-full shadow-lg border border-gray-200 z-10">
      <div className="flex justify-between items-center overflow-hidden">
        {tabs.map((tab) => (
          <Link
            className={`
              text-sm font-medium py-2 px-4 mx-1 rounded-full transition-all duration-300 ease-in-out
              ${pathname === tab.href
                ? "bg-blue-500 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:bg-gray-100"}
            `}
            href={tab.href}
            key={tab.href}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
