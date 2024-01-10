"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./models/user");
const post_1 = require("./models/post");
const comment_1 = require("./models/comment");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "blog",
    entities: [user_1.User, post_1.Post, comment_1.Comment],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map