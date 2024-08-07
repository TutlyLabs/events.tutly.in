import { db } from "@/lib/db";
import { CalendarEvents, Contests } from "@prisma/client";
import { google } from "googleapis";

const platforms = [
  "codeforces.com",
  "codechef.com",
  "leetcode.com",
  "atcoder.jp",
  "hackerearth.com",
  "geeksforgeeks.org",
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

  const newEvents = await db.contests.createManyAndReturn({
    data: requiredData,
    skipDuplicates: true,
  });

  const response = await create_calendar_events(newEvents);

  return {
    new_events_count: newEvents.length,
    new_events: newEvents,
    upcomming_events_count: requiredData.length,
    upcomming_events: requiredData,
    calendar_events: response,
  };
};

const create_calendar_events = async (contests: Contests[]) => {
  const calendar = google.calendar({ version: "v3" });

  let auth = await get_auth();

  // https://calendar.google.com/calendar/embed?src=${calender_id}

  const mixed_calendar_id =
    "fa37d371ab7ef31af6304a31263ee48f6a0b8e1d79bb1e11932f5bd6f5dcb3b5@group.calendar.google.com";

  const leetcode_calendar_id =
    "8df2794c5e11670fdecf7e933b5e28aa026042a163a514e9a8560de837231213@group.calendar.google.com";

  const codechef_calendar_id =
    "c1501e6800b944547fab736fdea8ba378c7d5b1661f0ff26fa52b08882515f36@group.calendar.google.com";
  const codeforces_calendar_id =
    "5226fac6fbf202c27856efe9105289b3e6b450385c18f87e18c9152e92d18e04@group.calendar.google.com";
  const hackerearth_calendar_id =
    "8ae4c685b6f2b6c7880d62041460a2e9d70bd7e6fdb33b9b6cc78bc20c650899@group.calendar.google.com";
  const geeksforgeeks_calendar_id =
    "e5a3177497dab565925801024b7df23bdb75333e5bda2ade428321b88453877f@group.calendar.google.com";
  const atcoder_calendar_id =
    "feb0cc42466e3c037c24b5fb450b08ea705c8b487e330b39ac76a9b24e4913a7@group.calendar.google.com";

  const leetcode_codechef_calendar_id =
    "a684aaa9b56d7be3fb87e19d81e074dc0de3bcd84e551fcd4161330bd85a8ca1@group.calendar.google.com";
  const codeforces_codeforces_calendar_id =
    "87c961c4d84105c3db028655f110f2cb9733fe0f24dd149557bf0b5f54a7dd1d@group.calendar.google.com";
  const leetcode_codeforces_calendar_id =
    "5870152dd3cc0fba4afcf0c77e53e6de39150bb4221edc95cb6d66c4580a0c18@group.calendar.google.com";

  const leetcode_codechef_codeforces_calendar_id =
    "609e463fa9edf97ff29526f1ff76b054e646a2cccddf5424a1c5b169a9eddbec@group.calendar.google.com";

  const eventCreationPromises = contests.map(async (contest) => {
    const duration = contest.duration / 60;
    const host = contest.host.toLowerCase().split(".")[0];

    let calendar_ids = [mixed_calendar_id];
    let color_id = "6";

    switch (host) {
      case "leetcode":
        calendar_ids.push(leetcode_calendar_id);
        calendar_ids.push(leetcode_codechef_calendar_id);
        calendar_ids.push(leetcode_codeforces_calendar_id);
        color_id = "5";
        break;
      case "codechef":
        calendar_ids.push(codechef_calendar_id);
        calendar_ids.push(leetcode_codechef_calendar_id);
        calendar_ids.push(leetcode_codechef_codeforces_calendar_id);
        color_id = "4";
        break;
      case "codeforces":
        calendar_ids.push(codeforces_calendar_id);
        calendar_ids.push(codeforces_codeforces_calendar_id);
        calendar_ids.push(leetcode_codeforces_calendar_id);
        color_id = "1";
        break;
      case "hackerearth":
        calendar_ids.push(hackerearth_calendar_id);
        color_id = "9";
        break;
      case "geeksforgeeks":
        calendar_ids.push(geeksforgeeks_calendar_id);
        color_id = "2";
        break;
      case "atcoder":
        calendar_ids.push(atcoder_calendar_id);
        color_id = "8";
        break;
      default:
        break;
    }

    const event_description = `Platform : ${contest.host}\nDuration : ${duration}\nLink : ${contest.href}\n\n Powered by https://events.tutly.in`;

    const event = {
      summary: contest.name + " - " + contest.host,
      description: event_description,
      start: {
        dateTime: contest.startTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: contest.endTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      colorId: color_id,
    };

    const events = await Promise.all(
      calendar_ids.map(async (calendar_id) => {
        if (!auth) {
          auth = await get_auth();
        }

        // create new auth for every 7 events
        if (calendar_ids.indexOf(calendar_id) % 7 === 0) {
          auth = await get_auth();
        }

        const res = await calendar.events.insert({
          calendarId: calendar_id,
          requestBody: event,
          auth,
        });

        if (!res.data.id || !res.data.htmlLink) {
          throw new Error(
            `Error in creating event for ${contest.name} - ${contest.host}, response: ${res}`
          );
        }

        const calendar_event = await db.calendarEvents.create({
          data: {
            calendarId: calendar_id,
            contestId: contest.id,
            eventId: res.data.id,
            eventlink: res.data.htmlLink,
          },
        });

        // Introducing a delay between processing different contests
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Adding each created event to the array
        return calendar_event;
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return events;
  });

  // Wait for all events to be created
  const created_events = await Promise.all(eventCreationPromises);

  const failed_events = contests.filter((contest) => {
    return !created_events.some((event) =>
      event.map((e) => e.contestId).includes(contest.id)
    );
  });

  return {
    created_events_count: created_events.length,
    created_events: created_events,
    failed_events_count: failed_events.length,
    failed_events: failed_events,
  };
};

const get_auth = async () => {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY,
    "https://www.googleapis.com/auth/calendar"
  );

  return auth;
};

// const get_access_token = async () => {
//   // from the oauth playground https://developers.google.com/oauthplayground
//   const refresh_token = process.env.GOOGLE_EVENETS_REFRESH_TOKEN!;
//   const client_id = process.env.GOOGLE_EVENETS_CLIENT_ID!;
//   const client_secret = process.env.GOOGLE_EVENETS_SECRET!;

//   // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
//   const refresh_url = "https://www.googleapis.com/oauth2/v4/token";

//   const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(
//     client_id
//   )}&client_secret=${encodeURIComponent(
//     client_secret
//   )}&refresh_token=${encodeURIComponent(refresh_token)}`;

//   const refresh_request = {
//     body: post_body,
//     method: "POST",
//     headers: new Headers({
//       "Content-Type": "application/x-www-form-urlencoded",
//     }),
//   };

//   const response = await fetch(refresh_url, refresh_request).then((res) => {
//     return res.json();
//   });

//   return response.access_token;
// };

// // delete all events $$$ dangerous $$$
// const all = [
//   mixed_calendar_id,
//   leetcode_calendar_id,
//   codechef_calendar_id,
//   codeforces_calendar_id,
//   hackerearth_calendar_id,
//   geeksforgeeks_calendar_id,
//   atcoder_calendar_id,
//   leetcode_codechef_calendar_id,
//   codeforces_codeforces_calendar_id,
//   leetcode_codeforces_calendar_id,
//   leetcode_codechef_codeforces_calendar_id,
// ];

// all.forEach(async (calendar_id) => {
//   await calendar.events
//     .list({
//       calendarId: calendar_id,
//       auth,
//     })
//     .then(async (res) => {
//       if (!res.data.items || res.data.items.length === 0) return;

//       if (!auth) {
//         auth = await get_auth();
//       }

//       res.data.items.forEach(async (event) => {
//         await calendar.events.delete({
//           calendarId: calendar_id,
//           eventId: event.id!,
//           auth,
//         });

//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         console.log("Event deleted: %s", event.htmlLink);
//       });
//     });
//   await new Promise((resolve) => setTimeout(resolve, 5000));
// });
