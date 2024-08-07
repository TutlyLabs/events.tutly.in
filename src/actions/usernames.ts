import { db } from "../lib/db";
import getCurrentUser from "./getCurrentUser";


export const getUserNames = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return {};
    }


    const usernames = await db.codingProfiles.findMany({
        where: {
            userId: user.id,
        },
    });


    return usernames;
}