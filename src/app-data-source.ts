import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Post } from "./entity/post.entity";
import { Comment } from "./entity/comment.entity";

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