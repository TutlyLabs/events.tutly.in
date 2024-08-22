"use client";
import React, { useState,useEffect } from "react";
import Prizes from "@/components/Details/prizes";
import Timeline from "@/components/Details/timeline";
import Faq from "@/components/Details/faq";
import { FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import Image from "next/image";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import {toast,Toaster} from "react-hot-toast";

function Description({ event }: { event: any }) {
  const [activeComponent, setActiveComponent] = useState("Component1");
  const [modal, setModal] = useState(false);

  const components: { [key: string]: JSX.Element } = {
    Component1: <div>{event?.description}</div>,
    Component2: <Timeline rounds={event?.rounds} />,
    Component3: <Prizes prizes={event?.Prizes} />,
  };
  const [copyText, setCopyText] = useState("");

  useEffect(() => {
    setCopyText(window.location.href);
  }, []);


  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Link Copied !!")
      setModal(false);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  const calculateDaysLeft = () => {
    const now = Date.now();
    const deadline = new Date(event.endTime).getTime();
    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="px-12 bg-gray-100 pt-4 mx-auto dark:bg-primary">
      <div className="flex my-2 gap-3">
        {/* Left sidebar */}
        <div className="relative flex flex-col gap-2 w-2/3 h-screen overflow-y-auto">
          {/* Event banner */}
          <div className="bg-white h-96 shadow-sm w-full">
            <Image
              className="h-full w-full object-cover"
              src={event.href || "https://eventscal.lau.edu.lb/students/images/codebanner.jpg"}
              height={100}
              width={100}
              alt="banner"
            />
          </div>

          {/* Navigation tabs */}
          <div className="sticky top-0 flex items-center p-5 shadow-sm gap-6 text-zinc-600 h-20 bg-white z-10">
            {["Component1", "Component2", "Component3"].map((component, index) => (
              <h1
                key={index}
                className={`text-sm font-medium cursor-pointer p-2 px-3 rounded ${
                  activeComponent === component
                    ? "bg-primary text-white"
                    : "hover:bg-slate-200"
                }`}
                onClick={() => setActiveComponent(component)}
              >
                {component === "Component1" ? "Details" : component === "Component2" ? "Timeline" : "Prizes"}
              </h1>
            ))}
          </div>

          {/* Component content */}
          <div className="flex-1 bg-white p-4 shadow-sm">
            {components[activeComponent]}
          </div>

          {/* FAQ section */}
          <div className="flex-1 bg-white p-4 shadow-sm">
            <Faq />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-1/3 flex flex-col">
          {/* Event details */}
          <div className="p-5 bg-white shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-700">
              {event?.name}
            </h1>
            <div className="flex text-sm font-medium ml-2 gap-2 mt-4 items-center">
              <CgOrganisation className="h-6 w-5" />
              <p>{event?.host}</p>
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
                {event?.updatedAt.toUTCString().substring(0, 16)}
              </p>
            </div>
          </div>

          {/* Registration and other actions */}
          <div className="bg-white p-4 pt-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold">Free</div>
              <div className="flex gap-5">
                <FaRegHeart className="w-6 h-6" />
                <img
                  src="https://i.postimg.cc/rphxk8Hp/calendar.png"
                  height="14"
                  width="22"
                  alt="Calendar"
                />
                <IoIosShareAlt
                  className="w-6 h-6"
                  onClick={() => setModal(!modal)}
                />
              </div>
            </div>
            {/* Modal for sharing */}
            {modal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg text-center">
                  <p className="font-bold">{copyText}</p>
                  <button onClick={copyToClipboard} className="bg-blue-500 p-2 text-white rounded-md">
                    Copy Link
                  </button>
                  <Toaster />
                  <div onClick={()=>setModal(false)} className="bg-blue-500 p-2 text-white rounded-md">
                    <RxCross2 className="h-6 w-6"/>
                  </div>
                </div>
              </div>
            )}

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
                    : `${event.minTeamSize} - ${event.maxTeamSize}`}
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
        </div>
      </div>
    </div>
  );
}

export default Description;
