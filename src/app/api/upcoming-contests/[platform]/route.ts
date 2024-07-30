import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      platform: string;
    };
  }
) {

  const url = `https://clist.by:443/api/v4/contest/?username=vvlegend&api_key=e1dbb88caacaa4b12eca169bc3e60eac39048874&upcoming=true&start__gte=${new Date().toISOString()}&order_by=start&host=${params.platform}`;

  try {
    const res = await fetch(url);
    let data = await res.json();

    const newData = data.objects;
    return NextResponse.json(newData);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
