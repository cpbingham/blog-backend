import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, DeleteDateColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { Post } from "./post";
import { Comment } from "./comment"
 

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

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt: Date
}