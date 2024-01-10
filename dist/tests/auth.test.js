"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const auth_1 = require("../utils/auth");
(0, globals_1.test)('isPasswordValid correctly checks password', () => {
    const saltAndHash = (0, auth_1.getSaltAndHash)('password');
    const isValid = (0, auth_1.isPasswordValid)('password', saltAndHash);
    (0, globals_1.expect)(isValid).toBe(true);
});
//# sourceMappingURL=auth.test.js.map