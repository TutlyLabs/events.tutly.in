import { getContestsByPlatform } from "@/actions/contests";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const res = await getContestsByPlatform(params.platform);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
