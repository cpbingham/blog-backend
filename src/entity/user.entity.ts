import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
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
}