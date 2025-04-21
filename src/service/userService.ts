import { UserRepository } from "@/repositories/interface/userRepository";
import { OracleUserRepository } from "@/repositories/oracle/oracleUserRepository";
import { UserInput } from "@/repositories/types";


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

    async registerUser(data:UserInput){
        if(!!this.userRepo.findByEmail(data.email)) return null;
        return this.userRepo.create(data);
    }
}

export const usersv = UserService.getInstance();