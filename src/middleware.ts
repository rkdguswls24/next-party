import { NextRequest, NextResponse } from "next/server";

import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const privateRoutes = ["/private","/post","/category"]
const adminRoutes = ["/admin"]


export default async function middleware(request:NextRequest){
    const response = middlewareAuth(request) ?? NextResponse.next();
    
    return response
}

async function middlewareAuth(request:NextRequest){
    const {pathname} = request.nextUrl;
    
    if(privateRoutes.includes(request.nextUrl.pathname)){
       
        const isAuthenticated = await checkUserSession(request.cookies);
        if(!isAuthenticated){
            return NextResponse.redirect(new URL("/login",request.url))
        }    

        if(adminRoutes.includes(pathname)){
            const isAdmin = await checkUserRole(request.cookies);
            if(!isAdmin){
                return NextResponse.redirect(new URL("/",request.url))
            }
        }
    }

    
}

async function checkUserSession(cookies:RequestCookies):Promise<boolean>{
   
    const res = await fetch("http://localhost:3000/api/auth/check-session",{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${cookies.get("session-id")?.value}`
        },
        credentials:"include"

    })
    
    return res.ok;
}
// 관리자 권한 확인
async function checkUserRole(cookies: RequestCookies): Promise<boolean> {
    const res = await fetch("http://localhost:3000/api/auth/check-role", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${cookies.get("session-id")}`
        }
    });

    if (res.ok) {
        const data = await res.json();
        return data.role === "admin";
    }
    
    return false; // 역할이 admin이 아니거나 세션이 무효하면 false
}
// async function middlewareAuth(request:NextRequest){
//     if(privateRoutes.includes(request.nextUrl.pathname)){
//         const user = await getUserFromSession(request.cookies)
//         if(user === null){
//             return NextResponse.redirect(new URL("/login",request.url))
//         }
//     }
//     if(adminRoutes.includes(request.nextUrl.pathname)){
//         const user = await getUserFromSession(request.cookies)
//         if(user === null){
//             return NextResponse.redirect(new URL("/login",request.url))
//         }
//         if(user.role !== "admin"){
//             return NextResponse.redirect(new URL("/",request.url))
//         }
//     }
// }
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    ],
  }