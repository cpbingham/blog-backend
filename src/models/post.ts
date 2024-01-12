import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BaseEntity, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Comment } from "./comment";
import { User } from "./user";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    body: string

    @CreateDateColumn()
    created: Date

    @Column({ nullable: true })
    userId: number

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt: Date
}