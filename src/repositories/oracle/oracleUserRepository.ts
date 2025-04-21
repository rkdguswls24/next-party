import { getOracleConnection } from "@/lib/oracle";
import { UserRepository } from "../interface/userRepository";
import { roleType, User, UserInput } from "../types";


type UserRow ={
    ID:number;
    NAME:string;
    EMAIL:string;
    ROLE: roleType;
    DESCRIPTION:string;
}


export class OracleUserRepository implements UserRepository {
    async create(user: UserInput):Promise<User|null> {
        const conn = await getOracleConnection();
        const result = await conn.execute<UserRow>(
            `INSERT INTO users (email,name,description,role) values(:email, :name, :description,role)`,
            {email:user.email,name:user.name,description:user.description||'',role:user.role || roleType.NORMAL},
            {autoCommit:true}
        )
        await conn.close();
        const row = result.rows?.[0];
        if(!row) return null;
        const returnedUser: User = {
            id:row.ID,
            name:row.NAME,
            email:row.EMAIL,
            description:row.DESCRIPTION,
            role:row.ROLE,
        }

        return returnedUser
        
    }
    async update(id: string, user: Partial<UserInput>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email:string):Promise<User|null|undefined> {
        const conn = await getOracleConnection();
        const result = await conn.execute<UserRow>(
            `SELECT * FROM users WHERE EMAIL = :email`,
            [email],

        )
        const row = result.rows?.[0] || null;
        if(!row) return null;
        const returnedUser:User = {
            id:row.ID,
            name:row.NAME,
            email:row.EMAIL,
            description:row.DESCRIPTION,
            role:row.ROLE,
        }
        return returnedUser;
    }
    
}