"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const router = express_1.default.Router();
const Controller = new users_1.default();
router.get('/', Controller.getAllUsers);
router.post('/', Controller.createUser);
router.delete('/:id', Controller.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map