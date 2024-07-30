import { requestAllContests } from "@/actions/contests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const res = await requestAllContests();

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
