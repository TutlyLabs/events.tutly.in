"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const hostLogos: { [key: string]: string } = {
  "leetcode.com": "https://i.postimg.cc/Qd5QqfpX/image.png",
  "codeforces.com": "https://i.postimg.cc/xTmNrcq5/image.png",
  "codechef.com": "https://i.postimg.cc/66mCJkcW/image.png",
  "atcoder.jp": "https://i.postimg.cc/SjbsQfjr/image.png",
  "hackerearth.com": "https://i.postimg.cc/x85jvJRG/image.png",
  "hackerrank.com": "https://i.postimg.cc/t4ZyTmLN/image.png",
};

const topBar = [
  { name: "All", value: "all" },
  { name: "Leetcode", value: "leetcode.com" },
  { name: "Codeforces", value: "codeforces.com" },
  { name: "Codechef", value: "codechef.com" },
  { name: "Atcoder", value: "atcoder.jp" },
  { name: "HackerEarth", value: "hackerearth.com" },
  { name: "HackerRank", value: "hackerrank.com" },
];

export default function Home() {
  const [platform, setPlatform] = useState("all");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      let res = null;

      if (platform === "all") {
        res = await fetch(`/api/upcoming-contests`);
      } else {
        res = await fetch(`/api/upcoming-contests/${platform}`);
      }
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      console.log(json);

      setData(json);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [platform]);

  const handleChange = (e: string) => {
    setPlatform(e);
  };

  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-4 mb-4">
        Upcoming Contests
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {topBar.map((item: any) => (
          <button
            key={item.name}
            onClick={() => handleChange(item.value)}
            className={`text-white font-semibold py-1 px-2 rounded-xl ${
              platform === item.value
                ? "bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && data && data.length === 0 && (
        <div className="text-center text-xl text-gray-500">
          Currently there are no available contests for the respective contest
        </div>
      )}

      {!loading && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((contest: any) => (
            <div
              key={contest.id}
              className="bg-white hover:bg-gray-100 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
                  <Image
                    src={hostLogos[contest.host]}
                    alt={`${contest.host} logo`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 truncate flex-grow">
                  {contest.name}
                </h3>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Host:</span> {contest.host}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Start:</span>{" "}
                  {new Date(contest.startTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">End:</span>{" "}
                  {new Date(contest.endTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Duration:</span>{" "}
                  {contest.duration / 60} minutes
                </p>
              </div>
              <a
                href={contest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg text-center transition-colors duration-300 hover:bg-blue-600"
              >
                Join Contest
              </a>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center mt-4">Error: {error}</div>
      )}
    </div>
  );
}
