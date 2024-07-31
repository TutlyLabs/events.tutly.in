import { db } from "../lib/db";

const platforms = [
  "codeforces.com",
  "codechef.com",
  "leetcode.com",
  "atcoder.jp",
  "hackerearth.com",
  "hackerrank.com",
];


const host__iregex = platforms.join("|");
const username = process.env.CLIST_USERNAME;

const api_key = process.env.CLIST_API_KEY;

export const fetchAllContests = async () => {
  const url = `https://clist.by:443/api/v4/contest/?username=${username}&api_key=${api_key}&upcoming=true&start__gte=${new Date().toISOString()}&order_by=start&host__iregex=${host__iregex}`;
  const res = await fetch(url);
  const data = await res.json();

  const requiredData = data.objects.map((contest: any) => {
    return {
      contest_id: String(contest.id),
      name: contest.event,
      host: contest.host,
      startTime: new Date(contest.start).toISOString(),
      endTime: new Date(contest.end).toISOString(),
      duration: contest.duration,
      href: contest.href,
    };
  });

  await db.contests.createMany({
    data: requiredData,
    skipDuplicates: true,
  });

  return requiredData;
};

export const getAllContests = async () => {
  const res = await db.contests.findMany({
    where: {
      startTime: {
        gte: new Date().toISOString(),
      },
    },
  });

  return res;
};

export const getContestsByPlatform = async (platform: string) => {
  const res = await db.contests.findMany({
    where: {
      host: platform,
      startTime: {
        gte: new Date().toISOString(),
      },
    },
  });

  return res;
};
