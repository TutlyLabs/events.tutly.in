"use client";
import React, { useState } from "react";
import Prizes from "@/components/Details/prizes";
import Timeline from "@/components/Details/timeline";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import Image from "next/image";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import Faq from "@/components/Details/faq";

function Description({ event }: { event: any }) {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const components: { [key: string]: JSX.Element } = {
    Component1: <div>{event.description}</div>,
    Component2: <Timeline rounds={event.rounds} />,
    Component3: <Prizes prizes={event.Prizes} />,
  };
  const calculateDaysLeft = () => {
    const now = Date.now();
    const deadline = new Date(event.endTime).getTime();
    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)); // Round up to nearest whole day
    return daysLeft > 0 ? daysLeft : 0; // Return 0 if deadline has passed
  };
  const daysLeft = calculateDaysLeft();
  return (
    <div className="px-12 bg-gray-100 pt-8 mx-auto dark:bg-primary">
      {/* <pre className='text-black'>{JSON.stringify(event, null, 2)}</pre> */}
      {/* top image bar */}
      {event?.href ? (
        <div className="bg-white h-96 shadow-sm w-full">
          <Image
            className="h-full w-full"
            src={event.href}
            height={100}
            width={100}
            alt="banner"
          />
        </div>
      ) : (
        <div className="bg-white h-96 shadow-sm w-full">
          <Image
            className="h-full w-full"
            src="https://eventscal.lau.edu.lb/students/images/codebanner.jpg"
            height={100}
            width={100}
            alt="banner"
          />
        </div>
      )}
      <div className="flex my-2 gap-2">
        {/* left side bar */}
        <div className="flex flex-col gap-2 w-2/3 h-screen overflow-y-auto">
          <div className="p-5 bg-white shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-700">
              {event.name}
            </h1>
            <div className="flex text-sm font-medium ml-2 gap-2 mt-4 items-center">
              <CgOrganisation className="h-6 w-5" />
              <p>{event.host}</p>
            </div>
            <div className="text-sm font-medium flex ml-2 gap-2 mt-4 items-center">
              <Image
                src="https://i.postimg.cc/rphxk8Hp/calendar.png"
                height="14"
                width="20"
                alt="Calendar"
              />
              <p>
                <b>Updated On :</b>{" "}
                {event.updatedAt.toUTCString().substring(0, 16)}
              </p>
            </div>
          </div>
          <div className="sticky top-0 flex items-center pl-10 p-5 shadow-sm gap-6 text-zinc-600 h-20 bg-white z-10">
            <h1
              className={`text-sm font-medium cursor-pointer p-2 px-3 rounded ${
                activeComponent === "Component1"
                  ? "bg-primary text-white"
                  : "hover:bg-slate-200"
              }`}
              onClick={() => setActiveComponent("Component1")}
            >
              Details
            </h1>
            <h1
              className={`text-sm font-medium cursor-pointer p-2 px-3 rounded ${
                activeComponent === "Component2"
                  ? "bg-primary text-white"
                  : "hover:bg-slate-200"
              }`}
              onClick={() => setActiveComponent("Component2")}
            >
              Timeline
            </h1>
            <h1
              className={`text-sm font-medium cursor-pointer p-2 px-3 rounded ${
                activeComponent === "Component3"
                  ? "bg-primary text-white"
                  : "hover:bg-slate-200"
              }`}
              onClick={() => setActiveComponent("Component3")}
            >
              Prizes
            </h1>
          </div>
          <div className="flex-1 bg-white p-4 shadow-sm">
            {components[activeComponent]}
          </div>
          <div className="flex-1 bg-white p-4 shadow-sm">
            <Faq />
          </div>
        </div>
        {/* right side bar */}
        <div className="flex flex-col gap-2 w-1/3 h-screen sticky top-0">
          <div className="bg-white p-4 pt-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold">Free</div>
              <div className="flex gap-5">
                <FaRegHeart className="w-6 h-6" />
                <img
                  src="https://i.postimg.cc/rphxk8Hp/calendar.png"
                  height="14"
                  width="22"
                />
                <IoIosShareAlt className="w-6 h-6" />
              </div>
            </div>
            <p className="p-3 text-center font-medium my-4 text-white rounded-xl bg-blue-500 cursor-pointer">
              Register
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="text-zinc-500 bg-slate-200 rounded">
                <IoMdPeople className="h-6 w-6 m-2" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500">Team size</p>
                <p className="text-sm font-medium">
                  {event.minTeamSize === event.maxTeamSize
                    ? event.minTeamSize
                    : event.minTeamSize + " - " + event.maxTeamSize}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3 mt-3">
              <div className="bg-slate-200 text-zinc-500 rounded">
                <MdOutlineAccessTime className="h-6 w-6 m-2" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500">Registration Deadline</p>
                <p className="text-sm font-medium">{daysLeft} days left</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white shadow-sm p-4">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
