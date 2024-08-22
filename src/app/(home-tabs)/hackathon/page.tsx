"use client";
import { title } from "process";
import React, { useState } from "react";

const data = [
  {
    title: "Hackathon 1",
    type: "HACKATHON",
    tags: ["ML", "Krithomedh", "Blockchain"],
    mode: "Offline",
    timeline: [
      {
        round: 1,
        date: "2022-12-12",
        time: "10:00 AM",
      },
      {
        round: 2,
        date: "2022-12-20",
        time: "8:00 AM",
      },
      {
        round: 3,
        date: "2022-12-23",
        time: "12:30 PM",
      },
    ],
    lastdate: "2022-12-10",
    fee: 200,
    prizes: [
      {
        name: "1st",
        amount: 2000,
      },
      {
        name: "2nd",
        amount: 1000,
      },
      {
        name: "3rd",
        amount: 500,
      },
    ],
  },
  {
    title: "Hackathon 2",
    type: "HACKATHON",
    tags: ["ML", "Krithomedh", "Blockchain"],
    mode: "Online",
    timeline: [
      {
        round: 1,
        date: "2022-12-12",
        time: "10:00 AM",
      },
      {
        round: 2,
        date: "2022-12-20",
        time: "8:00 AM",
      },
      {
        round: 3,
        date: "2022-12-23",
        time: "12:30 PM",
      },
    ],
    lastdate: "2022-12-10",
    fee: 200,
    prizes: [
      {
        name: "1st",
        amount: 2000,
      },
      {
        name: "2nd",
        amount: 1000,
      },
      {
        name: "3rd",
        amount: 500,
      },
    ],
  },
  {
    title: "Hackathon 3",
    type: "HACKATHON",
    tags: ["ML", "CSI", "AI"],
    mode: "Offline",
    timeline: [
      {
        round: 1,
        date: "2024-12-12",
        time: "10:00 AM",
      },
      {
        round: 2,
        date: "2024-12-20",
        time: "8:00 AM",
      },
      {
        round: 3,
        date: "2024-12-23",
        time: "12:30 PM",
      },
    ],
    lastdate: "2024-12-10",
    fee: null,
    prizes: [
      {
        name: "1st",
        amount: 2000,
      },
      {
        name: "2nd",
        amount: 1000,
      },
      {
        name: "3rd",
        amount: 500,
      },
    ],
  },
  {
    title: "Hackathon 1",
    type: "CONTEST",
    tags: ["CP", "Logical Thinking", "Blockchain"],
    timeline: [
      {
        round: 1,
        date: "2022-12-12",
        time: "10:00 AM",
      },
      {
        round: 2,
        date: "2022-12-20",
        time: "8:00 AM",
      },
      {
        round: 3,
        date: "2022-12-23",
        time: "12:30 PM",
      },
    ],
    lastdate: "2022-12-10",
    fee: 200,
    prizes: [
      {
        name: "1st",
        amount: 2000,
      },
      {
        name: "2nd",
        amount: 1000,
      },
      {
        name: "3rd",
        amount: 500,
      },
    ],
  },
  {
    title: "Hackathon 1",
    type: "WORKSHOP",
    tags: ["CP", "Logical Thinking", "Blockchain"],
    timeline: [
      {
        round: 1,
        date: "2022-12-12",
        time: "10:00 AM",
      },
      {
        round: 2,
        date: "2022-12-20",
        time: "8:00 AM",
      },
      {
        round: 3,
        date: "2022-12-23",
        time: "12:30 PM",
      },
    ],
  },
];

function Hackathon() {
  const [search, setSearch] = useState<String>("");
  return (
    <div className="min-h-dvh px-32 py-4 text-black">
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
              {data
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index} className="flex justify-between p-2 px-4 items-center border-b hover:bg-white cursor-pointer hover:scale-y-105 duration-500 hover:shadow-sm">
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-full bg-white"></div>
                      <h1 className="p-1 px-2">{item.title}</h1>
                    </div>
                    <div>Details</div>
                  </div>
                ))}
              {data.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              ).length == 0 && (
                  <h1 className="p-1 px-2 text-center py-4">No results found!</h1>
                )}
            </div>
          )}
        </div>
        <button className="bg-white rounded-lg p-2 px-4 border">Filters</button>
      </div>
      <div className="flex gap-2 flex-wrap justify-between my-8">
        {data.map((item, index) => {
          if (item.type !== "HACKATHON") return null;
          return (
            <div key={index} className="rounded-xl p-4 px-6 shadow-sm w-[48%] flex flex-col my-2 gap-8 bg-white">
              <div>
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <h1 className="text-xs">{item.type}</h1>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-sm py-2 text-slate-400 uppercase font-semibold">
                    Theme
                  </h1>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag,index) => (
                      <p key={index} className="p-0.5 border-2 border-slate-100 px-2 rounded-full">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h1>Registration fee</h1>
                  {item.fee !== null ? (
                    <p className="text-xl font-semibold">₹ {item.fee}</p>
                  ) : (
                    <p className="text-xl font-semibold">FREE</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                    {item.mode}
                  </h1>
                  {item.lastdate && (
                    <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                      {item.lastdate >= new Date().toISOString().split("T")[0]
                        ? "Open"
                        : "Closed"}
                    </h1>
                  )}
                  <h1 className="p-2 px-3 rounded-lg bg-slate-100 text-sm font-semibold">
                    Start Date : {item.timeline[0].date}
                  </h1>
                </div>
                <button
                  disabled={
                    (item.lastdate &&
                      item.lastdate < new Date().toISOString().split("T")[0]) ||
                    false
                  }
                  className="rounded p-2 px-4 bg-primary-600 text-white"
                >
                  Register now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hackathon;
