

import crypto from "crypto"


export async function hashPassword(password: string, salt: string):Promise<string> {
    return new Promise((resolve,reject) => {
        crypto.scrypt(password.normalize(),salt,64, (error, hash) => {
            if(error) reject(error)

            resolve(hash.toString("hex").normalize())
        })

    })
    
}

export function generateSalt() {
    return crypto.randomBytes(16).toString('hex').normalize()
}
export async function comparePasswords({
  password,
  salt,
  hashedPassword,  
}:{
    password:string;
    salt:string;
    hashedPassword:string;
}) {
    
    const inputHashedPassword = await hashPassword(password,salt);
    const bufferinput = Buffer.from(inputHashedPassword,"hex");
    const bufferdb = Buffer.from(hashedPassword,"hex");
    
    if(bufferinput.length !== bufferdb.length) return false;
    
    return crypto.timingSafeEqual(
        bufferinput,
        bufferdb
    )
}

export function generateRandomHexString(bytes:number):string{
    const array = new Uint8Array(bytes)
    return crypto.getRandomValues(array)
    .reduce((hex,byte) => hex+byte.toString(16).padStart(2,'0'),'');
}