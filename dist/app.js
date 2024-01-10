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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dbManager_1 = __importDefault(require("./dbManager"));
class App {
    constructor(dataSourceOptions) {
        this.app = (0, express_1.default)();
        this.dbManager = new dbManager_1.default(dataSourceOptions);
    }
    startListening(port) {
        this.server = this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    stopListening() {
        if (this.server) {
            this.server.close(() => { });
        }
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dbManager.initializeDataSource();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
    }
    setupRoutes() {
        this.app.use('/', routes_1.default);
    }
    initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnect();
            this.setupMiddleware();
            this.setupRoutes();
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map