
import oracledb from 'oracledb';
import { getOracleConnection } from "@/lib/oracle";
import { UserRepository } from "../interface/userRepository";
import { roleType, User } from "../types";
import { UserSchema } from '../dbschemas';



export class OracleUserRepository implements UserRepository {
    
    async create(user: any):Promise<any> {
        
        const conn = await getOracleConnection();
        const result = await conn.execute<any>(
            `INSERT INTO users (email,name,description,role,password,salt)
             values(:email, :name, :description,:role,:password,:salt)
             RETURNING id INTO :id`,
            {email:user.email,name:user.name,description:'',role:user.role || roleType.NORMAL,password:user.password,salt:user.salt,
                id: {dir:oracledb.BIND_OUT,type:oracledb.NUMBER}
            },
            {autoCommit:true,outFormat:oracledb.OUT_FORMAT_OBJECT}
        )
        await conn.close();
        console.log(result.outBinds);
        if(result.rowsAffected && result.rowsAffected > 0)
            return result.outBinds.id[0];

        return null;
        
    }
    async createWithoutCommit(user: any, conn: oracledb.Connection): Promise<boolean> {
        const result = await conn.execute<User>(
            `INSERT INTO users (email,name,description,role,password,salt) values(:email, :name, :description,:role,:password,:salt)`,
            {email:user.email,name:user.name,description:'',role:user.role || roleType.NORMAL,password:user.password,salt:user.salt},
            {autoCommit:true,outFormat:oracledb.OUT_FORMAT_OBJECT}
        )
        if(result.rowsAffected && result.rowsAffected > 0)
            return true;

        return false;
    }
    async update(id: string, user: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email:string):Promise<User|null|undefined> {
        const conn = await getOracleConnection();
        const result = await conn.execute<User>(
            `SELECT 
                id AS "id",
                email AS "email",
                name AS "name",
                password AS "password",
                role AS "role",
                salt AS "salt",
                description AS "description"
            FROM users WHERE EMAIL = :email AND ROWNUM = 1`,
            [email],
            {outFormat: oracledb.OUT_FORMAT_OBJECT}
            
        )
        await conn.close();
        const row = result.rows?.[0] || null;
        if(!row) return null;
        
        row.description = row.description || '';
        
        const parsedUser = UserSchema.safeParse(row);
        
        if(!parsedUser.success) {
            console.error('Invalid user data:',parsedUser.error.errors);
            return null;
        }
        
        return parsedUser.data;
    }
    
}