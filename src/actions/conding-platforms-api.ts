import axios from "axios";

const platforms = [
  "codeforces.com",
  "codechef.com",
  "leetcode.com",
  "atcoder.jp",
  "geeksforgeeks.org",
];

type PlatformsType = typeof platforms[number];

interface Contest {
  host: PlatformsType;
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  href: string;
}

const parseCodechef = (data: any) => {
  let contests: Contest[] = [];
  for (let i = 0; i < data.length; i++) {
    let contest = {} as Contest;
    contest.host = "codechef.com";
    contest.name = data[i].contest_name;
    contest.startTime = data[i].contest_start_date;
    let date = new Date(contest.startTime);
    let milliseconds = date.getTime();
    contest.startTime = milliseconds;
    contest.duration = data[i].contest_duration * 60 * 1000;
    contest.endTime = contest.startTime + contest.duration;
    contest.href = "https://www.codechef.com/" + data[i].contest_code;
    contests.push(contest);
  }
  return contests;
};

const parseCodeforces = (data: any) => {
  let contests: Contest[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].phase === "FINISHED") break;
    let contest = {} as Contest;
    contest.host = "codeforces.com";
    contest.name = data[i].name;
    contest.startTime = data[i].startTimeSeconds * 1000;
    contest.duration = data[i].durationSeconds * 1000;
    contest.endTime = contest.startTime + contest.duration;
    contest.href = "https://codeforces.com/contest/" + data[i].id;
    contests.push(contest);
  }

  return contests;
};

const parseLeetcode = (data: any) => {
  let contests: Contest[] = [];
  for (let i = 0; i < data.length; i++) {
    let contest = {} as Contest;
    contest.host = "leetcode.com";
    contest.name = data[i].title;
    contest.startTime = data[i].startTime * 1000;
    contest.duration = data[i].duration * 1000 ;
    contest.endTime = contest.startTime + contest.duration;
    contest.href = "https://leetcode.com/contest/" + data[i].titleSlug;
    contests.push(contest);
  }
  return contests;
};

export const getUpcomingContests = async () => {
  let contests: Contest[] = [];
  await axios
    .post(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      contests.push(response.data.future_contests);
    });
  await axios
    .post("https://leetcode.com/graphql", {
      headers: {
        "Content-Type": "application/json",
      },
      query: `{
          topTwoContests{
            title
            startTime
            duration
            cardImg
            titleSlug
          }
        }`,
    })
    .then((response) => {
      contests.push(response.data.data.topTwoContests);
    });
  await axios
    .post("https://codeforces.com/api/contest.list", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      contests.push(response.data.result);
    });
  let sorted = [
    ...parseLeetcode(contests[1]),
    ...parseCodeforces(contests[2]),
    ...parseCodechef(contests[0]),
  ].sort(function (a, b) {
    return a.startTime - b.startTime;
  });
  return sorted;
};

// individual functions to get contests from different platforms
export const getCodeChefContests = async () => {
  const res = await axios.get(
    "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
  );

  const contests = parseCodechef(res.data.future_contests).sort(function (a,b) {
    return a.startTime - b.startTime;
  });
  return contests;
};

export const getCodeForcesContests = async () => {
  const res = await axios.get("https://codeforces.com/api/contest.list")

  const contests = parseCodeforces(res.data.result).sort(function (a, b) {
    return a.startTime - b.startTime;
  });
  return contests;
};

export const getLeetCodeContests = async () => {
  const res =   await axios.post("https://leetcode.com/graphql", {
    headers: {
      "Content-Type": "application/json",
    },
    query: `{
        topTwoContests{
          title
          startTime
          duration
          cardImg
          titleSlug
        }
      }`,
  })

  const contests = parseLeetcode(res.data.data.topTwoContests).sort(function (a, b) {
    return a.startTime - b.startTime;
  });
  
  return contests;
};

// export const getAtCoderContests = async () => {
//   const res = await axios.get("https://atcoder.jp/contests/");
//   return res.data;
// };

// export const getGeeksForGeeksContests = async () => {
//   const res = await axios.get("https://www.geeksforgeeks.org/");
//   return res.data;
// };
