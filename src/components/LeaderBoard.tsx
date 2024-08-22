"use client";

import React from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string | null;
}

interface LeaderboardEntry {
  user: User;
  codeChefRating: number | null;
  codeforcesRating: number | null;
  leetCodeRating: number | null;
  atCoderRating: number | null;
  geeksForGeeksRating: number | null;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const getTotalRating = (entry: LeaderboardEntry): number => {
    return (
      (entry.codeChefRating || 0) +
      (entry.codeforcesRating || 0) +
      (entry.leetCodeRating || 0) +
      (entry.atCoderRating || 0) +
      (entry.geeksForGeeksRating || 0)
    );
  };

  const sortedEntries = entries.sort(
    (a, b) => getTotalRating(b) - getTotalRating(a)
  );

  return (
    <div className="max-w-7xl mx-auto max-sm:px-4 mt-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r bg-clip-text text-transparent from-sky-400 via-blue-500 to-indigo-600 ">
        Coding Leaderboard
      </h1>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  CodeChef
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Codeforces
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  LeetCode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  AtCoder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  GeeksForGeeks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr
                  key={entry.user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } transition-all duration-300 ease-in-out hover:bg-indigo-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {entry.user.image ? (
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={entry.user.image}
                            alt={entry.user.name}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {entry.user.name[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.codeChefRating || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.codeforcesRating || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.leetCodeRating || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.atCoderRating || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.geeksForGeeksRating || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {getTotalRating(entry)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
