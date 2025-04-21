import { PostSchema, signInSchema, signUpSchema, UserSchema } from './dbschemas';
import { z } from "zod"

export enum roleType {
    NORMAL = "normal",
    ADMIN = "admin",
}

export type Post = z.infer<typeof PostSchema>
export type User = z.infer<typeof UserSchema>
export type SignUpInfo = z.infer<typeof signUpSchema>
export type signInInfo = z.infer<typeof signInSchema>
