  import React from 'react'
  import { MdOutlineAccessTime } from "react-icons/md";

  function Timeline() {
    return (
      <div className="flex flex-col gap-6 font-oswald relative">
        <div className="absolute top-0 left-8 h-full w-0.5 bg-blue-400"></div>
        <div className="flex gap-4 flex-1 group">
          <div className="flex flex-col h-full items-center bg-blue-100 p-4 w-16 rounded-full relative group-hover:bg-blue-200 transition duration-300">
            < MdOutlineAccessTime className="h-8 w-8 group-hover:text-blue-500 transition duration-300"/>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition w-full duration-300">
            <p className="text-lg font-semibold text-blue-600">Registration</p>
            <h1 className="text-sm font-medium text-gray-600">Start date: 16 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">End date: 20 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">Venue: VNRVJIET</h1>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat architecto consectetur adipisci voluptates voluptatem! Minus accusantium libero, amet ratione perferendis veritatis explicabo incidunt sequi.</p>
          </div>
        </div>
        <div className="flex gap-4 flex-1 group">
          <div className="flex flex-col h-full items-center bg-blue-100 p-4 w-16 rounded-full relative group-hover:bg-blue-200 transition duration-300">
            < MdOutlineAccessTime className="h-8 w-8 group-hover:text-blue-500 transition duration-300"/>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition w-full duration-300">
            <p className="text-lg font-semibold text-blue-600">Round-1</p>
            <h1 className="text-sm font-medium text-gray-600">Start date: 16 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">End date: 20 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">Venue: VNRVJIET</h1>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat architecto consectetur adipisci voluptates voluptatem! Minus accusantium libero, amet ratione perferendis veritatis explicabo incidunt sequi.</p>
          </div>
        </div>
        <div className="flex gap-4 flex-1 group">
          <div className="flex flex-col h-full items-center bg-blue-100 p-4 w-16 rounded-full relative group-hover:bg-blue-200 transition duration-300">
            < MdOutlineAccessTime className="h-8 w-8 group-hover:text-blue-500 transition duration-300"/>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg w-full transition duration-300">
            <p className="text-lg font-semibold text-blue-600">Round-2</p>
            <h1 className="text-sm font-medium text-gray-600">Start date: 16 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">End date: 20 July 2024</h1>
            <h1 className="text-sm font-medium text-gray-600">Venue: VNRVJIET</h1>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat architecto consectetur adipisci voluptates voluptatem! Minus accusantium libero, amet ratione perferendis veritatis explicabo incidunt sequi.</p>
          </div>
        </div>
        <div className="flex gap-4 flex-1 group">
          <div className="flex flex-col h-full items-center bg-blue-100 p-4 w-16 rounded-full relative group-hover:bg-blue-200 transition duration-300">
            < MdOutlineAccessTime className="h-8 w-8 group-hover:text-blue-500 transition duration-300"/>
          </div>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition duration-300 w-full">
            <p className="text-lg font-semibold text-blue-600">Results</p>
            <h1 className="text-sm font-medium text-gray-600">Date: 19 July 2024</h1>
          </div>
        </div>
      </div>
    )
  }

  export default Timeline
