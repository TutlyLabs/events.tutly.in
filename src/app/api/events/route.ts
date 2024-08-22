import { createEvent } from "@/actions/events";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, type, slug, tags, startTime } = await req.json();
    console.log(name, type, slug, tags, startTime);
    
    const res = await createEvent({ name, type, slug, tags, startTime });

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
