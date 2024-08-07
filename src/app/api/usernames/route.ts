
import { getUserNames } from "@/actions/usernames";
import { NextRequest,NextResponse } from "next/server";


export async function GET (req: NextRequest) {
    console.log("api/usernames");
    

    try{
        const usernames = await getUserNames();

        console.log(usernames,"usernames");
        
        
        return NextResponse.json(usernames);
    }
    catch(error: any){
        return NextResponse.json({
            error: error.message,
        });
    }
    
}