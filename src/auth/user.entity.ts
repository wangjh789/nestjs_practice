import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role;


}