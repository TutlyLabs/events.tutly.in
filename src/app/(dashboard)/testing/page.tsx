"use client";

import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    setData(null);
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-4 mb-4">
        Upcoming Contests{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className="
            flex
            gap-5
            mb-4
        "
        >
          <label
            htmlFor="platform"
            className=" block text-xl text-gray-300 font-semibold"
          >
            Platform Name:
          </label>
          <select
            id="platform"
            name="platform"
            className="block w-fit p-2 border border-gray-300 rounded-md"
            onChange={(e) => setPlatform(e.target.value)}
            required
          >
            <option value="all">All</option>
            <option value="codeforces.com">Codeforces</option>
            <option value="codechef.com">Codechef</option>
            <option value="leetcode.com">Leetcode</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fetch Contests
        </button>
      </form>
      {data && (
        <div>
          <h2
            className=" text-2xl font-semibold mt-4 mb-4 text-center text-cyan-400">
            Results:
          </h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
