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
const globals_1 = require("@jest/globals");
const auth_1 = require("../../src/utils/auth");
const supertest_1 = require("supertest");
const app_1 = __importDefault(require("../../src/app"));
(0, globals_1.describe)("Test", () => {
    (0, globals_1.test)('test', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.request)(app_1.default).get("/posts/");
        (0, globals_1.expect)(res.body.title).toEqual("First Blog Post");
    }));
});
(0, globals_1.test)('isPasswordValid correctly checks password', () => {
    const saltAndHash = (0, auth_1.getSaltAndHash)('password');
    const isValid = (0, auth_1.isPasswordValid)('password', saltAndHash);
    (0, globals_1.expect)(isValid).toBe(true);
});
// describe("DOg", () => {
//     it("works", async() => {
//         const res = await
//     })
// })
// request('https://dog.ceo')
//   .get('/api/breeds/image/random')
//   .end(function(err, res) {
//         if (err) throw err;
//         console.log(res.body);
//   });
//# sourceMappingURL=auth.test.js.map