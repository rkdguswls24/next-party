import { generateSalt, hashPassword } from "@/lib/core/passwordHasher";
import { UserRepository } from "@/repositories/interface/userRepository";
import { OracleUserRepository } from "@/repositories/oracle/oracleUserRepository";
import { SignUpInfo } from "@/repositories/types";




export class UserService {
    private static instance:UserService;

    constructor(private readonly userRepo:UserRepository){}
    
    public static getInstance():UserService{
        if(!UserService.instance){
            UserService.instance =  new UserService(new OracleUserRepository())
        }
        return UserService.instance;
    }

    async getUser(email:string) {
        
         return this.userRepo.findByEmail(email);
    }

    async registerUser(data:SignUpInfo){
        
        
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password,salt);
        const parseData = {...data,password:hashedPassword,salt}
        
        return this.userRepo.create(parseData);
    }
}

export const usersv = UserService.getInstance();