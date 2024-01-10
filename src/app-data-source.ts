import { DataSource } from "typeorm";
import {User}  from "./models/user";
import { Post } from "./models/post";
import { Comment } from "./models/comment";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "blog",
    entities: [User, Post, Comment],
    logging: true,
    synchronize: true,
})