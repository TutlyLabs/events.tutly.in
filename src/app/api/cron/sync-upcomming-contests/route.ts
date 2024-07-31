import { fetchAllContests } from "@/actions/syncContets";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("token");
    if (!secret || secret != process.env.CRON_JOB_SECRET) {
      return NextResponse.json({
        error: "Invalid request",
      });
    }

    const res = await fetchAllContests();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
