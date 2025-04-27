import { SessionRepository } from "@/repositories/interface/sesssionRepository";


export class SessionService {
    constructor(private sessionRepo:SessionRepository){}

    async getSessionUser(sessionId:string) {
        return this.sessionRepo.findById(sessionId)
    }
    async createSession(user:any,expiredate:number) {
        const parseUser = {
            ...user,
            expiredate:new Date(expiredate).toISOString().slice(0,19).replace('T',' '),
        }
        
        return this.sessionRepo.create(parseUser);
    }
    async deleteSession(sessionId:string){
        return this.sessionRepo.delete(sessionId)
    }
}