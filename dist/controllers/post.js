"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = new models_1.Post();
                post.title = req.body.title;
                post.body = req.body.body;
                yield post.save();
                res.status(201).json({
                    status: 'ok',
                    message: 'created',
                    data: post
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: 'internal_server_error',
                    errors: error
                });
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page) || 1;
            const itemPerPage = Number(req.query.itemPerPage) || 10;
            try {
                const postsAndCount = yield models_1.Post.findAndCount({
                    skip: (page - 1) * itemPerPage,
                    take: itemPerPage
                });
                res.status(200).json({
                    status: "ok",
                    message: "created",
                    data: postsAndCount,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "failed",
                    message: "internal_server_error",
                    errors: error,
                });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=post.js.map