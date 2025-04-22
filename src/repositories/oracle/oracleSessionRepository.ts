import { getOracleConnection } from "@/lib/oracle";
import { SessionRepository } from "../interface/sesssionRepository";
import { UserSession } from "../types";
import OracleDB from "oracledb";
import oracledb from 'oracledb';



export class OracleSessionRepository implements SessionRepository {
    async findById(id: string): Promise<UserSession | null | undefined> {
        const conn = await getOracleConnection();
        try{
            const result = await conn.execute<UserSession>(
                `SELECT
                    userid AS "userid",
                    role AS "role"
                FROM usersession
                WHERE id = :id AND ROWNUM = 1
                `,
                [id],
                {outFormat:oracledb.OUT_FORMAT_OBJECT}
            )
            await conn.close();
            const row = result.rows?.[0] || null;
            if(!row) return null;
            row.userid = row.userid.toString();
            return row;
        }catch (e) {
            console.log(e)
            return null;
        }

    }
    async create(user: any): Promise<boolean> {
        
        const conn = await getOracleConnection();
        
        
        try{
            const result = await conn.execute<any>(
                `INSERT INTO usersession (id,role,expiredate,userid) values(:id,:role,to_date(:expiredate,'YYYY-MM-DD HH24:MI:SS'),:userid)`,
                {id:user.sessionid,role:user.role,expiredate:user.expiredate,userid:user.userid},
                {autoCommit:true,outFormat:oracledb.OUT_FORMAT_OBJECT}
            )
            
            if(result.rowsAffected && result.rowsAffected > 0) return true;
        }catch (e){
            console.log(e)
            return false;
        }
        
        await conn.close();
        
        
        
        return false;
    }
    async createWithoutCommit(user: any, conn: OracleDB.Connection): Promise<boolean> {
        const result = await conn.execute<any>(
            `INSERT INTO usersession (id,role,expiredate) values(:id,:role,to_date(:expiredate,'yyyy.mm.dd hh24:mi'))`,
            {id:user.id,role:user.role,expiredate:user.expireDate},
            {autoCommit:false}
        )
        if(result.rowsAffected && result.rowsAffected > 0) return true;
        
        return false;
    }
    update(id: string, user: Partial<UserSession>): Promise<UserSession> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}