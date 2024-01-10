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
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new models_1.User();
                user.username = req.body.username;
                user.email = req.body.email;
                user.salt = '1234';
                user.hash = '1234';
                yield user.save();
                res.status(201).json({
                    status: 'ok',
                    message: 'created',
                    data: user
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
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.find();
                res.status(200).json({
                    status: "ok",
                    message: "created",
                    data: users,
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
//# sourceMappingURL=users.js.map