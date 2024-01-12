import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, DeleteDateColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { Post } from "./post";
 

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    salt: string

    @Column({
        type: "varchar",
        length: 1024
    })
    hash: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt: Date
}