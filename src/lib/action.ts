'use server'
import { signIn, signOut } from "@/auth/auth";
import { z } from "zod";


import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "@/repositories/dbschemas";
import { createUserSession, removeUserFromSession } from "./core/session";
import { cookies } from "next/headers";
import { usersv } from "./service";

import { comparePasswords } from "./core/passwordHasher";

export async function signInWithOAuthSite(site:string) {
    await signIn(site,{redirectTo:"/home"});
}

export async function logOut() {
    //await signOut();
    await removeUserFromSession(await cookies());
    redirect("/home")
}


export async function signUp(unsafeData:z.infer<typeof signUpSchema>){
    const {success,data,error} = signUpSchema.safeParse(unsafeData);
    if(!success) return "Unable to create account";
    
    const existingUser = await usersv.getUserbyEmail(data.email);
    if(!!existingUser) return "Account already exists for this email"
    
    try {
        const user = await usersv.registerUser(data);
        
        if(!user) return "Unable to create account"
        const parseData = {
            sessionid: '',
            id: user,
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

    const user = await usersv.getUserbyEmail(data.email);

    if(user== null) return "Unable to log you in"
    
    const isCorrectPassword = await comparePasswords({
        password: data.password,
        hashedPassword: user.password,
        salt: user.salt,
    })

    
    
    if(!isCorrectPassword) return "Unable to log you in"
    await createUserSession(user, await cookies())
    redirect("/profile");
}