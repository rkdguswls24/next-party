import { OracleSessionRepository } from "@/repositories/oracle/oracleSessionRepository";
import { OracleUserRepository } from "@/repositories/oracle/oracleUserRepository";
import { SessionService } from "@/service/sessionService";
import { UserService } from "@/service/userService";

const userRepository = new OracleUserRepository();
const sessionRepository = new OracleSessionRepository();

export const usersv = new UserService(userRepository);
export const sessionsv = new SessionService(sessionRepository);