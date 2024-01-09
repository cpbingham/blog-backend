"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const post_entity_1 = require("./entity/post.entity");
const comment_entity_1 = require("./entity/comment.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "blog",
    entities: [user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map