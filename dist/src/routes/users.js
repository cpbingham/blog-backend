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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const express_1 = __importDefault(require("express"));
const user_entity_1 = require("../entity/user.entity");
const app_data_source_1 = require("../app-data-source");
const router = express_1.default.Router();
exports.Users = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).find();
    res.json(users);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(req.body);
    const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
    res.json(results);
}));
//# sourceMappingURL=users.js.map