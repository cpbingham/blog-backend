"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./app-data-source");
const posts_1 = require("./routes/posts");
const comments_1 = require("./routes/comments");
const users_1 = require("./routes/users");
const auth_1 = require("./routes/auth");
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.use('/posts', posts_1.Posts);
app.use('/comments', comments_1.Comments);
app.use('/users', users_1.Users);
app.use('/auth', auth_1.Auth);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map