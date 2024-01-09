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
exports.login = exports.register = void 0;
const app_data_source_1 = require("../app-data-source");
const user_entity_1 = require("../entity/user.entity");
const auth_1 = require("../utils/auth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const existingUsername = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({ username: username });
    if (existingUsername) {
        return res.status(400).json({ message: 'username is taken' });
    }
    const existingEmail = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({ email: email });
    if (existingEmail) {
        return res.status(400).json({ message: 'email is already in use' });
    }
    const newUser = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(Object.assign({ username,
        email }, (0, auth_1.getSaltAndHash)(password)));
    const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(newUser);
    return res.json({ results });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username) {
        return res.status(400).json({ message: `username can't be blank` });
    }
    if (!password) {
        return res.status(400).json({ message: `password can't be blank` });
    }
    const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({ username: username });
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
exports.login = login;
//# sourceMappingURL=auth.js.map