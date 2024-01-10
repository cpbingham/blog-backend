"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordValid = exports.getSaltAndHash = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const getSaltAndHash = (password) => {
    const salt = node_crypto_1.default.randomBytes(16).toString('hex');
    const hash = node_crypto_1.default.pbkdf2Sync(password, salt, 1, 512, 'sha512').toString('hex');
    return { salt, hash };
};
exports.getSaltAndHash = getSaltAndHash;
const isPasswordValid = (password, { salt, hash }) => {
    return (hash ===
        node_crypto_1.default.pbkdf2Sync(password, salt, 1, 512, 'sha512').toString('hex'));
};
exports.isPasswordValid = isPasswordValid;
//# sourceMappingURL=auth.js.map