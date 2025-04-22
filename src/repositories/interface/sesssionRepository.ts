import OracleDB from "oracledb";
import { User, UserSession } from "../types";


export interface SessionRepository {
    findById(id:string):Promise<UserSession|null|undefined>;
    create(user:any):Promise<boolean>;
    createWithoutCommit(user:any,conn:OracleDB.Connection):Promise<boolean>;
    update(id:string,user:Partial<UserSession>): Promise<UserSession>;
    delete(id:string):Promise<boolean>;
}