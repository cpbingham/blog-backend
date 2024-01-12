import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, DeleteDateColumn, JoinColumn } from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId'})
    user: User

    @Column({ nullable: true })
    postId: number

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "postId" })
    post: Post

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt: Date
}