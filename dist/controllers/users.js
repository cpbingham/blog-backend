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
            const page = Number(req.query.page) || 1;
            const itemPerPage = Number(req.query.itemPerPage) || 10;
            try {
                const usersAndCount = yield models_1.User.findAndCount({
                    skip: (page - 1) * itemPerPage,
                    take: itemPerPage
                });
                res.status(200).json({
                    status: "ok",
                    message: "created",
                    data: usersAndCount[0],
                    paging: {
                        page: page,
                        itemPerPage: itemPerPage,
                        itemCount: usersAndCount[1],
                        lastPage: Math.ceil(usersAndCount[1] / itemPerPage)
                    }
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
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOneBy({ id: parseInt(req.params.id) });
                if (!user) {
                    res.status(400).json({
                        status: 'not_found',
                        message: 'user not found'
                    });
                    return;
                }
                console.log('hello');
                yield user.softRemove();
                res.status(200).json({
                    status: "ok",
                    message: "deleted",
                    data: user
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