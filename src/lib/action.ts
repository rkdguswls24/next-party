'use server'
import { signIn, signOut } from "@/auth/auth";

export async function signInWithSite(site:string) {
    await signIn(site,{redirectTo:"/home"});
}

export async function logOut() {
    await signOut();
}