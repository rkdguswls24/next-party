import oracledb from 'oracledb';
import { oracleConfig } from './dbConfig';

export async function getOracleConnection(){
    return await oracledb.getConnection(oracleConfig);
    
}