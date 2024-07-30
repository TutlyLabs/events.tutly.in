import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = `https://clist.by:443/api/v4/contest/?username=vvlegend&api_key=e1dbb88caacaa4b12eca169bc3e60eac39048874&upcoming=true&start__gte=${new Date().toISOString()}&order_by=start`;

  try {
    const res = await fetch(url);
    let data = await res.json();

    const newData = data.objects.filter(
      (contest: any) =>
        contest.host === "codeforces.com" ||
        contest.host === "codechef.com" ||
        contest.host === "leetcode.com"
    );

    
    
    return NextResponse.json(newData);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
