'use server'
import { signIn, signOut } from "@/auth/auth";
import { z } from "zod";


import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "@/repositories/dbschemas";
import { createUserSession } from "./core/session";
import { cookies } from "next/headers";
import { usersv } from "./service";
import { UserSession } from "@/repositories/types";

export async function signInWithOAuthSite(site:string) {
    await signIn(site,{redirectTo:"/home"});
}

export async function logOut() {
    await signOut();
}

export async function testConnection() {
    
    console.log(await usersv.getUser("test1@test.com"))
    return 'sdf';
}

export async function signUp(unsafeData:z.infer<typeof signUpSchema>){
    const {success,data,error} = signUpSchema.safeParse(unsafeData);
    if(!success) return "Unable to create account";
    
    const existingUser = await usersv.getUser(data.email);
    if(!!existingUser) return "Account already exists for this email"
    
    try {
        const user = await usersv.registerUser(data);
        
        if(!user) return "Unable to create account"
        const parseData = {
            sessionid: '',
            userid: user,
            role:String(data.role) || 'normal',
        }
        
        await createUserSession(parseData,await cookies());

    }catch {
        
        return "Unable to create account"
    }

    
    redirect('/home')
    
}

export async function signInWithDB(unsafeData:z.infer<typeof signInSchema>){
    const {success,data} = signInSchema.safeParse(unsafeData);

    if(!success) return "Unable to log in with db data";
}