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
        ...usernames,
      },
    });
  } else {
    await db.codingProfiles.create({
      data: {
        userId: user.id,
        ...usernames,
      },
    });
  }

  return "Credentials submitted successfully!";
};
