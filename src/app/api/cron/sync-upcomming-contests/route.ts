import { fetchAllContests } from "@/actions/contests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const res = await fetchAllContests();

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
