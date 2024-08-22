"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CreateEventDialog } from "./CreateEvent";
function Hackathon({ events, type,tags }: {
  events: any;
  type: any;
  tags: {
    id: string;
    name: string;
  }[];
}) {
  const [search, setSearch] = useState<String>("");

  return (
    <div className="min-h-dvh px-32 py-4 text-black">
      <div className=" w-full flex flex-row-reverse my-5">
        <CreateEventDialog tags={tags} />
      </div>
      <div className="flex justify-between items-center p-3 px-4 bg-white rounded-xl shadow-md">
        <div className="relative">
          <input
            type="text"
            className="bg-slate-100 w-[600px] border p-2 px-4 outline-none rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Searching for any hackathon?"
          />
          {search != "" && (
            <div className="absolute top-12 rounded-xl w-[600px] bg-slate-100 shadow-md">
              {events
                .filter(
                  (item: any) =>
                    item.type === type &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item: any, index: any) => (
                  <Link
                    href={`/event/${item.name}:${item.slug}`}
                    key={index}
                    className="flex justify-between p-2 px-4 items-center border-b hover:bg-white cursor-pointer hover:scale-y-105 duration-500 hover:shadow-sm"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-full bg-white"></div>
                      <h1 className="p-1 px-2">{item.name}</h1>
                    </div>
                    <div>Details</div>
                  </Link>
                ))}
              {events.filter(
                (item: any) =>
                  item.type === type &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              ).length == 0 && (
                <h1 className="p-1 px-2 text-center py-4">No results found!</h1>
              )}
            </div>
          )}
        </div>
        <button className="bg-white rounded-lg p-2 px-4 border">Filters</button>
      </div>
      <div className="flex gap-2 flex-wrap justify-between my-8">
        {events.map((item: any, index: any) => {
          if (item.type !== type) return null;
          return (
            <div
              key={index}
              className="rounded-xl p-4 px-6 shadow-sm w-[48%] flex flex-col my-2 gap-8 bg-white"
            >
              <div>
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <h1 className="text-xs">{item.type}</h1>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-sm py-2 text-slate-400 uppercase font-semibold">
                    Theme
                  </h1>
                  <div className="flex gap-2 flex-wrap max-w-64 max-h-8 overflow-y-scroll">
                    {item.tags?.map((tag: {id:string , name:string}, index: any) => (
                      <p
                        key={index}
                        className="p-0.5 border-2 border-slate-100 px-2 rounded-full"
                      >
                        {tag.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h1>Registration fee</h1>
                  {item.fees !== 0 ? (
                    <p className="text-xl font-semibold">₹ {item.fees}</p>
                  ) : (
                    <p className="text-xl font-semibold">FREE</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {item.endTime ? (
                    <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                      {item.endTime.toISOString() >= new Date().toISOString()
                        ? "Open"
                        : "Closed"}
                    </h1>
                  ) : (
                    <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                      Open
                    </h1>
                  )}
                  {item.startTime && (
                    <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                      Start Date : {item.startTime.toISOString().split("T")[0]}
                    </h1>
                  )}
                </div>
                <Link
                  href={`/event/${item.name}:${item.slug}`}
                  className="rounded p-2 px-4 bg-primary text-white"
                >
                  {item.endTime &&
                  item.endTime.toISOString() < new Date().toISOString()
                    ? "View Details"
                    : "Register now"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hackathon;
