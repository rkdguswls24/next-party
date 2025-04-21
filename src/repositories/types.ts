export enum roleType {
    NORMAL = "normal",
    ADMIN = "admin",
}
export type Post = {
    // id: 0,
    //         title:"this is first",
    //         desc: "submtitlel fieksl get some fkslsfjellies,ejfsk  dfsl",
    //         createdAt: "2022-12-22",
    //         deadlineAt: "2024-12-23",
    //         members: [dummyUsers[0],dummyUsers[1]],
    //         maxCount: 10,
    //         status: true,
    id: number,
    title:string,
    desc: string,
    createdAt: string,
    deadlineAt: string,
    members: User[],
    maxCount: number,
    status: boolean,
}

export type User = {
    id:number,
    email: string,
    name: string,
    description: string,
    role: roleType,
}
export type UserInput = {
    email: string,
    name: string,
    description: string,
    role: roleType
}
