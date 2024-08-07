import { getAllUsersRatings } from "@/actions/ratings";
import { NextRequest,NextResponse } from "next/server";


export async function GET (req: NextRequest) {
    
    try{        
        const res = await getAllUsersRatings();

        
        return NextResponse.json(res);
    }
    catch(err:any){
        return  NextResponse.json({
            error: err.message,
        })
    }
}