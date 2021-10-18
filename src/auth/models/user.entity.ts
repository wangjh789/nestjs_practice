import { Item } from "src/item/models/item.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(type => Item, item => item.author, { eager: false })
    items: Item[]


}