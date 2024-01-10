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
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                if (!username) {
                    return res.status(400).json({ message: `username can't be blank` });
                }
                if (!email) {
                    return res.status(400).json({ message: `email can't be blank` });
                }
                if (!password) {
                    return res.status(400).json({ message: `password can't be blank` });
                }
                const existingUsername = yield user_1.User.findOneBy({ email: email });
                if (existingUsername) {
                    return res.status(400).json({ message: 'username is taken' });
                }
                const existingEmail = yield user_1.User.findOneBy({ username: username });
                if (existingEmail) {
                    return res.status(400).json({ message: 'email is already in use' });
                }
                const newUser = new user_1.User();
                const { salt, hash } = (0, auth_1.getSaltAndHash)(password);
                newUser.username = username;
                newUser.email = email;
                newUser.salt = salt;
                newUser.hash = hash;
                yield newUser.save();
                res.status(201).json({
                    status: 'ok',
                    message: 'created',
                    data: newUser
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
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username) {
                return res.status(400).json({ message: `username can't be blank` });
            }
            if (!password) {
                return res.status(400).json({ message: `password can't be blank` });
            }
            const user = yield user_1.User.findOneBy({ username: username });
            if (!user) {
                return res.status(400).json({ message: `username and/or password is incorrect` });
            }
            const salt = user.salt;
            const hash = user.hash;
            const passwordMatch = (0, auth_1.isPasswordValid)(password, { salt, hash });
            if (!passwordMatch) {
                return res.status(400).json({ message: `username and/or password is incorrect` });
            }
            return res.json({ user });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map