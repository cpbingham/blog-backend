import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsEmail } from "class-validator";
 

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
}