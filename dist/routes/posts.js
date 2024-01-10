"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../controllers/post"));
const router = express_1.default.Router();
const Controller = new post_1.default();
router.get('/', Controller.getAllPosts);
router.post('/', Controller.createPost);
exports.default = router;
//# sourceMappingURL=posts.js.map