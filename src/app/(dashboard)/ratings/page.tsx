'use client'

import { useState, useEffect } from "react";
import axios from "axios";


const platforms: string[] = [
  "Codeforces",
  "CodeChef",
  "LeetCode",
  "AtCoder",
  "GeeksForGeeks",
];

const contestRatings:string[] = [
    "codeChefRating",      
    "codeforcesRating",    
    "leetCodeRating",      
    "atCoderRating",       
    "geeksForGeeksRating", 
]


export default function UserRatings() {
    interface Usernames {
      Codeforces: string;
      CodeChef: string;
      LeetCode: string;
      AtCoder: string;
      GeeksForGeeks: string;
      id: string;
    }
    

    interface Ratings {
      [key: string]: any;
    }
    
  const [usernames, setUsernames] = useState<Usernames>({
    "Codeforces": "",
    "CodeChef": "",
    "LeetCode": "",
    "AtCoder": "",
    "GeeksForGeeks": "",
    "id" :""
  });
  const [ratings, setRatings] = useState<Ratings>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsernames();
  }, []);

  const fetchUsernames = async () => {
    try {
      const response = await axios.get("/api/usernames");
      setUsernames(response.data[0]);
      
    } catch (err) {
      setError("Failed to fetch usernames");
    }
  };

  
  
  const fetchRatings = async () => {
    setLoading(true);
    setError("");
    const newRatings: Ratings = {};

    for (const platform of platforms) {
      const username = usernames[platform as keyof Usernames];
      if (username) {
        try {
          const response = await axios.post(
            `/api/ratings`,
            { params: { username,platform } }
          );

          console.log(response.data);
          newRatings[platform] = response.data;
        } catch (err) {
          newRatings[platform] = { error: "Failed to fetch data" };
        }
      }
    }

    setRatings(newRatings);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-10 m-5">
      <h1 className="text-2xl font-bold mb-4">Your Coding Profiles</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Usernames</h2>
        <pre>
            {JSON.stringify(usernames, null, 2)}
        </pre>
      </div>

      <button
        onClick={fetchRatings}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? "Fetching..." : "Fetch Ratings"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div key={platform} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{platform}</h2>
            {ratings[platform] ? (
              <div>
                <p>Rating: {ratings[platform].rating || "N/A"}</p>
                <p>Contests: {ratings[platform].n_contests || "N/A"}</p>
              </div>
            ) 
            : (
              <p>No data available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
