import { generateSalt, hashPassword } from "@/lib/core/passwordHasher";
import { UserRepository } from "@/repositories/interface/userRepository";

import { SignUpInfo } from "@/repositories/types";




export class UserService {
    
    constructor(private readonly userRepo:UserRepository){}
    
    async getUserbyEmail(email:string) {
        
         return this.userRepo.findByEmail(email);
    }
    async getUserbyId(id:number){
        return this.userRepo.findById(id);
    }
    async registerUser(data:SignUpInfo){
        
        
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password,salt);
        const parseData = {...data,password:hashedPassword,salt}
        
        return this.userRepo.create(parseData);
    }
    
}