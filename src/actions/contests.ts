import { db } from "../lib/db";

export const getAllContests = async () => {
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
  const res = await db.contests.findMany({
    where: {
      host: platform,
      endTime: {
        gte: new Date().toISOString(),
      },
    },
  });

  return res;
};
