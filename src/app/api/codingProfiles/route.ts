import { createUserCodingProfiles } from "@/actions/codingProfiles";
import { NextResponse,NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  try {
    
    const usernames= await req.json();
    const res = await createUserCodingProfiles(usernames); 

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
} 