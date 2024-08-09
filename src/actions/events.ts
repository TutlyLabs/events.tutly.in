import { db } from "@/lib/db";

export const getEvents = async () => {
    const res = await db.event.findMany({
        select:{
            id: true,
            name: true,
            type: true,
            tags: true,
            fees: true,
            startTime: true,
            endTime: true,
            host: true,
            slug: true
        }
    })
    return res;
}
export const getEvent = async (id: string) => {
    const res = await db.event.findUnique({
        where: {
            slug: id
        },
        include:{
            rounds: true,
            Prizes: true
        }
    })
    return res;
}