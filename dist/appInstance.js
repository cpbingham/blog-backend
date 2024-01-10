"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppInstance = exports.createAppInstance = void 0;
const app_1 = __importDefault(require("./app"));
let appInstance;
const createAppInstance = (datasourceOptions) => {
    appInstance = new app_1.default(datasourceOptions);
    return appInstance;
};
exports.createAppInstance = createAppInstance;
const getAppInstance = () => appInstance;
exports.getAppInstance = getAppInstance;
//# sourceMappingURL=appInstance.js.map