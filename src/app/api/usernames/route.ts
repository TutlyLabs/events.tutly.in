
import { getUserNames } from "@/actions/usernames";
import { NextRequest,NextResponse } from "next/server";


export async function GET (req: NextRequest) {

    try{
        const usernames = await getUserNames();
        
        return NextResponse.json(usernames);
    }
    catch(error: any){
        return NextResponse.json({
            error: error.message,
        });
    }
    
}