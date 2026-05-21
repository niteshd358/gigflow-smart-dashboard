// interface is similar to obbject in js

export enum UserRole {
    ADMIN = "admin",
    SALES = "sales"
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}