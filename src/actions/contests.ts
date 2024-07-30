import { db } from "../lib/db";

export const requestAllContests = async () => {
  const url = `https://clist.by:443/api/v4/contest/?username=vvlegend&api_key=e1dbb88caacaa4b12eca169bc3e60eac39048874&upcoming=true&start__gte=${new Date().toISOString()}&order_by=start`;
  const res = await fetch(url);
  const data = await res.json();

  const newData = data.objects.filter(
    (contest: any) =>
      contest.host === "codeforces.com" ||
      contest.host === "codechef.com" ||
      contest.host === "leetcode.com"
  );

  const requiredData = newData.map((contest: any) => {
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

export const requestContestsByPlatform = async (platform: string) => {
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
