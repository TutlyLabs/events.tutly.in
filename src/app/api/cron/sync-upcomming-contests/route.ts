import { fetchAllContests } from "@/actions/syncContets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-cron-job-secret");
    if (secret != process.env.CRON_JOB_SECRET) {
      return NextResponse.json({
        error: "Invalid secret key",
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
