"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

function Tabs({tabs}:{
  tabs: {name: string, href: string}[]
}) {
  const pathname = usePathname();
  return (
    <div className="py-4 flex justify-center">
      <div className="inline-block p-1 rounded bg-primary-100">
        <div className="flex rounded justify-center gap-3">
          {tabs.map((tab) => {
            return (
              <Link
                className={`p-2 px-4 rounded uppercase text-sm tracking-wider font-semibold ${
                  pathname === tab.href
                    ? "bg-primary-700 text-white"
                    : "hover:bg-primary-300 text-primary-700"
                }`}
                href={tab.href}
                key={tab.href}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
