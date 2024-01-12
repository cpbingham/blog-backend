"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = __importDefault(require("../controllers/comment"));
const router = express_1.default.Router();
const Controller = new comment_1.default();
router.get('/', Controller.getAllComments);
router.post('/', Controller.createComment);
router.delete('/:id', Controller.deleteComment);
exports.default = router;
//# sourceMappingURL=comments.js.map