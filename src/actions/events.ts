import { db } from "@/lib/db";

export const getEvents = async () => {
  const res = await db.event.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      tags: {
        select:{
          name: true,
        }
      },
      fees: true,
      startTime: true,
      endTime: true,
      host: true,
      slug: true,
    },
  });
  return res;
};
export const getEvent = async (id: string) => {
  const res = await db.event.findUnique({
    where: {
      slug: id,
    },
    include: {
      rounds: true,
      Prizes: true,
    },
  });
  return res;
};

export const createEvent = async ({
  name,
  type,
  slug,
  tags,
  startTime,
}: {
  name: string;
  type: import("/home/vighnesh/Desktop/Git_Repos/events.tutly.in/node_modules/.prisma/client/index").$Enums.EventType;
  slug: string;
  tags: {id:string , name:string}[];
  startTime: string;
}) => {
  try {
    const res = await db.event.create({
      data: {
        name,
        type,
        slug,
        // tags,
        startTime,
      },
    });

    console.log(res, "res at createEvent");

    return res;
  } catch (err) {
    console.log(err);
  }
};

export async function generateUniqueSlug(name: string) {
  let slug = name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  let existingSlug = await db.event.findUnique({
    where: {
      slug: slug,
    },
  });

  let counter = 1;
  while (existingSlug) {
    const newSlug = `${slug}-${counter}`;
    existingSlug = await db.event.findUnique({
      where: { slug: newSlug },
    });
    if (!existingSlug) {
      slug = newSlug;
      break;
    }
    counter++;
  }

  return slug;
}

export const getAllTags = async () => {
  const res = await db.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return res;
}
