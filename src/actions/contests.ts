import { db } from "../lib/db";
import {
  getCodeChefContests,
  getCodeForcesContests,
  getLeetCodeContests,
  getUpcomingContests,
} from "./conding-platforms-api";

export const getAllContests = async () => {
  return await getUpcomingContests()

  const res = await db.contests.findMany({
    where: {
      endTime: {
        gte: new Date().toISOString(),
      },
    },
  });

  return res;
};

export const getContestsByPlatform = async (platform: string) => {
  // const res = await db.contests.findMany({
  //   where: {
  //     host: platform,
  //     endTime: {
  //       gte: new Date().toISOString(),
  //     },
  //   },
  // });

  if (platform === "codeforces.com") {
    return await getCodeForcesContests();
  } else if (platform === "codechef.com") {
    return await getCodeChefContests();
  } else if (platform === "leetcode.com") {
    return await getLeetCodeContests();
  } else {
    return [];
  }
};
