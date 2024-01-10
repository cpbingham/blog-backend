import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { Post } from "./post";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
}