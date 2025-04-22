import { z } from "zod";
import { roleType } from "./types";
const roleEnum = [roleType.ADMIN,roleType.NORMAL] as const
export const UserSchema = z.object({
    id:z.number(),
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    description: z.string().optional(),
    role: z.string(),
    salt: z.string(),
})

export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    desc: z.string().optional(),
    createdAt: z.string(),
    deadlineAt: z.string(),
    members: z.array(UserSchema),
    maxCount:z.number(),
    status:z.boolean(),
    
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
    role: z.string().optional(),
})
export const sessionSchema = z.object({
    userid:z.string(),

    role:z.string(),
})

