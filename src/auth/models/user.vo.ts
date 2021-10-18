import { Role } from "./role.enum";

export class UserVO {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}