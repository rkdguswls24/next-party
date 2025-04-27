import OracleDB from "oracledb";
import { User } from "../types";


export interface UserRepository {
    findByEmail(email:string):Promise<User|null|undefined>;
    findById(id:number):Promise<User|null|undefined>;
    create(user:any):Promise<any>;
    createWithoutCommit(user:any , conn:OracleDB.Connection):Promise<boolean>;
    update(id:string,user:Partial<User>): Promise<User>;
    delete(id:string):Promise<boolean>;
}