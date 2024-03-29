"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
const Controller = new auth_1.default();
router.post('/register', Controller.register);
router.post('/login', Controller.login);
exports.default = router;
//# sourceMappingURL=auth.js.map