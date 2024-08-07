import { fetchRatings } from "@/actions/ratings";
import { NextResponse,NextRequest } from "next/server";

export async function POST (req: NextRequest) {
    const {params} = await req.json();
    
    try{
        const response = await fetchRatings(params.username,params.platform);

        
        
        return NextResponse.json(response);
    }
    catch(err:any){
        return  NextResponse.json({
            error: err.message,
        })
    }
}