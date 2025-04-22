
import { UserSession } from '@/repositories/types'
import crypto from 'crypto'
import { sessionsv } from '../service'
import { sessionSchema } from '@/repositories/dbschemas';


const COOKIE_SESSION_KEY = "session-id";
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

export type Cookies = {
    set: (
        key: string,
        value: string,
        options: {
            secure? : boolean
            httpOnly?: boolean
            sameSite?: 'strict' | 'lax'
            expires? : number
        }
    ) => void
    get: (key:string) => {name:string; value:string} | undefined
    delete: (key:string) => void
}

export async function createUserSession(user:any,cookies:Cookies) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize()
    user.sessionid = sessionId;
    const expiredate = Date.now() + SESSION_EXPIRATION_SECONDS * 1000
    
    
    
    const result = await sessionsv.createSession(user,expiredate);

    setCookie(sessionId,cookies);
}   
export function getUserFromSession(cookies:Pick<Cookies,"get">){
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
    
    if(sessionId == null) return null
    
    return getUserSessionById(sessionId)

}

function setCookie(sessionId:string,cookies:Pick<Cookies,"set">){
    cookies.set(COOKIE_SESSION_KEY, sessionId, {
        secure : true,
        httpOnly: true,
        sameSite: "lax",
        expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000
    })
}



async function getUserSessionById(sessionId:string){
    const rawUser = await sessionsv.getSessionUser(sessionId)
    
    const {success,data:user} = sessionSchema.safeParse(rawUser)
    
    return success ? user : null;
}