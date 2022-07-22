export type Role = "customer" | "admin" | "user"
export interface User {
    username: string;
    fullname: string;
    roles: Role[]
}