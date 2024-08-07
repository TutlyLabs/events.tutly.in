import { db } from "../lib/db";
import getCurrentUser from "./getCurrentUser";


export const getUserNames = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return "User not found";
    }

    const prevUser = await db.codingProfiles.findFirst({
        where: {
            userId: user.id,
        },
    });

    if (!prevUser) {
        return "User not found";
    }

    const usernames = await db.codingProfiles.findMany({
        where: {
            userId: user.id,
        },
    });

    return usernames;
}