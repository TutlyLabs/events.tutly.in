import { db } from "../lib/db";
import getCurrentUser from "./getCurrentUser";

export const createUserCodingProfiles = async (usernames: {
  [key: string]: string;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }
  

  const prevUser = await db.codingProfiles.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (prevUser) {
    await db.codingProfiles.update({
      where: {
        id: prevUser.id,
      },
      data: {
        CodeChef : usernames?.Codechef,
        Codeforces : usernames?.Codeforces,
        LeetCode : usernames?.Leetcode,
        AtCoder : usernames?.Atcoder,
        GeeksForGeeks : usernames?.Geeksforgeeks,
      },
    });
  } else {
    await db.codingProfiles.create({
      data: {
        userId: user.id,
        CodeChef : usernames?.Codechef,
        Codeforces : usernames?.Codeforces,
        LeetCode : usernames?.Leetcode,
        AtCoder : usernames?.Atcoder,
        GeeksForGeeks : usernames?.Geeksforgeeks,
      },
    });
  }

  return "Credentials submitted successfully!";
};
