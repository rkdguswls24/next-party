import { User, UserInput } from "../types";


export interface UserRepository {
    findByEmail(email:string):Promise<User|null|undefined>;
    create(user:UserInput):Promise<User|null>;
    update(id:string,user:Partial<UserInput>): Promise<User>;
    delete(id:string):Promise<boolean>;
}