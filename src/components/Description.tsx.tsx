"use client";
import React, { useState } from 'react';
import Prizes from "@/components/Details/prizes"
import Timeline from '@/components/Details/timeline';
import Details from '@/components/Details/details';
import { FaRegHeart } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import Image from 'next/image';
import { MdOutlineAccessTime } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import Faq from '@/components/Details/faq';

function Description() {
  const [activeComponent, setActiveComponent] = useState('Component1');

  const components: { [key: string]: JSX.Element } = {
    Component1: <Details />,
    Component2: <Timeline />,
    Component3: <Prizes />
  };

  return (
    <div className="px-16 bg-gray-100">
      {/* top image bar */}
      <div className="bg-white h-96 shadow-sm w-full">
        {/* <Image className="h-96 w-full" src="https://media.geeksforgeeks.org/wp-content/uploads/20230724195303/Hackathons-For-Beginners.webp" height={100} width={100}/> */}
      </div>
      <div className="flex my-2 gap-2">
        {/* left side bar */}
        <div className="flex flex-col gap-2 w-2/3 h-screen overflow-y-auto">
          <div className="p-5 bg-white shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-700">Quiz-A-Thon</h1>
            <div className="flex text-sm font-medium ml-2 gap-2 mt-4 items-center">
              <CgOrganisation className="h-6 w-5" />
              <p>Tutly</p>
            </div>
            <div className="text-sm font-medium flex ml-2 gap-2 mt-4 items-center">
              <Image src="https://i.postimg.cc/rphxk8Hp/calendar.png" height="14" width="20" alt="Calendar" />
              <p><b>Updated On :</b> Jun 15, 2024</p>
            </div>
          </div>
          <div className="sticky top-0 flex items-center pl-10 p-5 shadow-sm gap-10 text-zinc-600 h-20 bg-white z-10">
            <h1 className="text-sm font-medium cursor-pointer" onClick={() => setActiveComponent('Component1')}>Details</h1>
            <h1 className="text-sm font-medium cursor-pointer" onClick={() => setActiveComponent('Component2')}>Timeline</h1>
            <h1 className="text-sm font-medium cursor-pointer" onClick={() => setActiveComponent('Component3')}>Prizes</h1>
          </div>
          <div className="flex-1 bg-white p-4 shadow-sm">
            {components[activeComponent]}
          </div>
          <div className="flex-1 bg-white p-4 shadow-sm">
            <Faq/>
          </div>
        </div>
        {/* right side bar */}
        <div className="flex flex-col gap-2 w-1/3 h-screen sticky top-0">
          <div className="bg-white p-4 pt-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold">
                Free
              </div>
              <div className="flex gap-5">
                <FaRegHeart className="w-6 h-6" />
                <img src="https://i.postimg.cc/rphxk8Hp/calendar.png" height="14" width="22"/>
                <IoIosShareAlt className="w-6 h-6" />
              </div>
            </div>
            <p className="p-3 text-center font-medium my-4 text-white rounded-xl bg-blue-500 cursor-pointer">Register</p>
            <div className="flex items-center gap-4 border-t-[1px] pt-3">
              <div className="text-zinc-500 bg-slate-200 rounded mt-3">
                <IoMdPeople className="h-6 w-6 m-2" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Team size</p>
                <p className="text-sm font-medium">Individual participation</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3 mt-3">
              <div className="bg-slate-200 text-zinc-500 rounded">
                <MdOutlineAccessTime className="h-6 w-6 m-2" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Registration Deadline</p>
                <p className="text-sm font-medium">8 days left</p>
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
