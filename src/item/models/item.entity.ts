import { User } from "src/auth/models/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from './genre.enum'

@Entity('item')
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Genre })
    genre: Genre;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(type => User, user => user.items, { eager: false })
    author: User;
}