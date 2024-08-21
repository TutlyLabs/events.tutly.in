import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";

function Timeline({ rounds }) {
  return (
    <div className="flex flex-col gap-6 font-oswald relative">
      {/* <pre>{JSON.stringify(rounds, null, 2)}</pre> */}
      <div className="absolute top-0 left-8 h-full w-0.5 bg-blue-400"></div>
      {rounds.map((round, index) => {
        return (
          <div key={index} className="flex gap-4 flex-1 group">
            <div className="flex flex-col h-full items-center bg-blue-100 p-4 w-16 rounded-full relative group-hover:bg-blue-200 transition duration-300">
              <MdOutlineAccessTime className="h-8 w-8 group-hover:text-blue-500 transition duration-300" />
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition w-full duration-300">
              <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-blue-600">{round.name}</p>
              <p className="font-semibold text-sm"><span className="font-bold text-lg">•</span>{round.mode}</p>
              </div>
              <h1 className="text-sm font-medium text-gray-600">
                Start date: {round.startTime?round.startTime.toISOString():"-"}
              </h1>
              <h1 className="text-sm font-medium text-gray-600">
                End date: {round.endTime?round.endTime.toISOString():"-"}
              </h1>
              <h1 className="text-sm font-medium text-gray-600">
                Venue: {round.venue?round.venue:"-"}
              </h1>
              <p className="text-gray-500">{round.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
