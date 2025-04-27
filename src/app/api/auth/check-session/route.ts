import { getUserFromSession } from "@/lib/core/session";
import { cookies } from "next/headers";

export async function GET(req:Request){
    
    const sessionId = req.headers.get('Authorization')?.replace('Bearer ','');
    //console.log((req.headers.get('Authorization')?.replace('Bearer ','')))
    
    if(sessionId === 'undefined'){
        return new Response('Unauthorizeed',{status:401});
    }

    
    return new Response('Session Valid',{status:200});
}
