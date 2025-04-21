import { User } from "../types";


export interface UserRepository {
    findByEmail(email:string):Promise<User|null|undefined>;
    create(user:any):Promise<User|null>;
    update(id:string,user:Partial<User>): Promise<User>;
    delete(id:string):Promise<boolean>;
}