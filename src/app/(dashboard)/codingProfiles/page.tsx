'use client'
import React, { useState } from "react";
import axios from "axios";

const platforms = [
  "Codeforces",
  "Codechef",
  "Leetcode",
  "Atcoder",
  "Hackerearth",
  "Geeksforgeeks",
];

export default function UserForm() {
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (platform : string, value:string) => {
    setUsernames((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/codingProfiles", usernames);
      
      setMessage("coding Profiles submitted successfully!");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br   flex items-center justify-center p-4">
      <div
        className=" rounded-lg shadow-xl p-8 w-full max-w-md"
        style={{
          background: "rgba(255, 255, 255, 0.35)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4.5px)",
          WebkitBackdropFilter: "blur(4.5px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Coding Profiles
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform} className="relative">
              <input
                type="text"
                id={platform}
                value={usernames[platform] || ""}
                onChange={(e) => handleChange(platform, e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors peer focus:mt-5"
                placeholder=" "
              />
              <label
                htmlFor={platform}
                className="absolute left-3 top-2 text-gray-500 transition-all duration-300 transform 
                           peer-focus:-translate-y-5 peer-focus:text-xl peer-focus:text-blue-100 peer-focus:font-semibold
                           peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base
                           -translate-y-5 text-xs"
              >
                {platform}
              </label>
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg transition-all duration-300 ease-in-out
                        ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-700 active:transform active:scale-95"
                        }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}