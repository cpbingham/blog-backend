import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, BaseEntity, DeleteDateColumn } from "typeorm";
import { Comment } from "./comment";

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

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
    deletedAt: Date
}