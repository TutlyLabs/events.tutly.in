"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FcClock } from "react-icons/fc";
import { GoArrowUpRight } from "react-icons/go";
import Navbar from "@/components/TabBar";

const hostLogos: { [key: string]: string } = {
  "leetcode.com": "https://i.postimg.cc/Qd5QqfpX/image.png",
  "codeforces.com": "https://i.postimg.cc/xTmNrcq5/image.png",
  "codechef.com": "https://i.postimg.cc/66mCJkcW/image.png",
  "atcoder.jp": "https://i.postimg.cc/SjbsQfjr/image.png",
  "geeksforgeeks.org": "https://i.postimg.cc/hvq3mm92/image.png",
};

const hostColors: { [key: string]: string } = {
  "codechef.com": "bg-blue-500",
  "codeforces.com": "bg-red-800",
  "geeksforgeeks.org": "bg-emerald-700",
  "atcoder.jp": "bg-black",
};

const topBar = [
  { name: "All", value: "all" },
  { name: "Leetcode", value: "leetcode.com" },
  { name: "Codeforces", value: "codeforces.com" },
  { name: "Codechef", value: "codechef.com" },
  { name: "Atcoder", value: "atcoder.jp" },
  { name: "GeeksforGeeks", value: "geeksforgeeks.org" },
];

const timeFilters = [
  { name: "All", value: null },
  { name: "Under 1 Day", value: 1 },
  { name: "Under 1 Week", value: 7 },
  { name: "Under 10 Days", value: 10 },
  { name: "Under 2 Weeks", value: 14 },
];

export default function Home() {
  const [platform, setPlatform] = useState("all");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<number | null>(
    null
  );

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

      setData(json);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [platform]);

  const handleTimeFilterChange = (value: number | null) => {
    setSelectedTimeFrame(value);
  };

  function CountdownTimer({ startTime }: { startTime: string }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const start = new Date(startTime);
        const difference = start.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft("Contest Started");
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [startTime]);

    return (
      <div className="flex items-center justify-center gap-2 text-center font-semibold text-medium text-red-600 mb-2">
        <FcClock className="w-5 h-5" />
        {timeLeft}
      </div>
    );
  }

  function convertToIST(dateString: string) {
    const date = new Date(dateString);
    // const istOffset = 5.5 * 60 * 60000;
    const istOffset = 0;
    return new Date(date.getTime() + istOffset);
  }

  const filteredData = data?.filter((contest: any) => {
    if (!selectedTimeFrame) return true;
    const now = new Date();
    const start = convertToIST(contest.startTime);
    const difference =
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return difference <= selectedTimeFrame;
  });

  return (
    <div className="container m-auto p-4 relative">
      {/* <h1 className="text-4xl font-bold text-center mt-4 mb-4">
        Upcoming Contests
      </h1> */}
      <div className="max-w-2xl mx-auto mb-8">
        <Navbar topBar={topBar} setTab={setPlatform} />
        <div className="absolute right-2 top-4">
          <select
            onChange={(e) =>
              handleTimeFilterChange(parseInt(e.target.value) || null)
            }
            className="p-2 rounded-lg bg-slate-100 text-black font-semibold"
            defaultValue=""
          >
            <option value="" disabled>
              Filters
            </option>
            {timeFilters.map((filter, index) => (
              <option key={filter.value} value={String(filter.value)}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && filteredData.length === 0 && (
        <div className="text-center text-xl text-gray-500">
          Currently there are no available contests.
        </div>
      )}

      {!loading && filteredData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((contest: any) => (
            <div
              key={contest.id}
              className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-100 flex flex-col"
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
                <div className="flex-grow overflow-hidden">
                  <h3 className="text-xl font-bold text-gray-800 truncate text-clip flex items-center justify-between pe-1.5">
                    {contest.name}
                    {convertToIST(contest.startTime) > new Date() &&
                      convertToIST(contest.endTime) < new Date() && (
                        <div className="w-3 h-3 rounded-full bg-red-500 relative">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute opacity-75"></div>
                        </div>
                      )}
                  </h3>
                  <div className="text-xs text-gray-50 me-4 capitalize py-0.5">
                    <span
                      className={`px-1.5 py-0.5 rounded-lg font-semibold text-white ${
                        hostColors[contest.host] || "bg-sky-600"
                      }`}
                    >
                      {contest.host.split(".")[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-600 mb-2 uppercase">
                  <span className="font-semibold normal-case">Starts at:</span>{" "}
                  {convertToIST(contest.startTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-2 uppercase">
                  <span className="font-semibold normal-case">Ends at:</span>{" "}
                  {convertToIST(contest.endTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Duration:</span>{" "}
                  {contest.duration / (60 * 1000)} minutes
                </p>
              </div>
              <CountdownTimer
                startTime={convertToIST(contest.startTime).toISOString()}
              />
              <a
                href={contest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex gap-1 items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors duration-300 hover:bg-blue-600"
              >
                Join Contest{" "}
                <GoArrowUpRight className="w-5 h-5 font-bold mt-0.5" />
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
