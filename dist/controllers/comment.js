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
class CommentController {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = new models_1.Comment();
                comment.body = req.body.body;
                comment.postId = req.body.postId;
                comment.post = req.body.postId;
                yield comment.save();
                res.status(201).json({
                    status: 'ok',
                    message: 'created',
                    data: comment
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
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield models_1.Comment.find();
                res.status(200).json({
                    status: "ok",
                    message: "created",
                    data: comments,
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
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield models_1.Comment.findOneBy({ id: parseInt(req.params.id) });
                if (!comment) {
                    res.status(400).json({
                        status: 'not_found',
                        message: 'comment not found'
                    });
                    return;
                }
                yield comment.softRemove();
                res.status(200).json({
                    status: "ok",
                    message: "deleted",
                    data: comment
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
exports.default = CommentController;
//# sourceMappingURL=comment.js.map