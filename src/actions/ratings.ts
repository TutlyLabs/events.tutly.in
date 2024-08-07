import { db } from "../lib/db";

const resources: { [key: string]: string } = {
  "Codeforces": "codeforces.com",
  "CodeChef": "codechef.com",
  "LeetCode": "leetcode.com",
  "AtCoder": "atcoder.jp",
  "Hackerearth": "hackerearth.com",
  "GeeksForGeeks": "geeksforgeeks.org",
};
const rootUser = process.env.CLIST_USERNAME;
const api_key = process.env.CLIST_API_KEY;


export const fetchRatings = async (username: string,platform:string) => {
  if(username === ""){
    throw new Error("Username is empty");
  }

  if(platform === 'LeetCode'){
    username = username+"@.com";
  }
  
  const url = `https://clist.by:443/api/v4/account/?username=${rootUser}&api_key=${api_key}&total_count=true&resource=${resources[platform]}&handle=${username}`;

  console.log(username,platform,resources[platform]);
  


    const response = await fetch(url);
    const data = await response.json();


    if(data.meta.total_count === 0){
        throw new Error("User not found");
    }

    return data.objects[0];
}