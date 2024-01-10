"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const typeorm_1 = require("typeorm");
const models_1 = require("./models");
const mysql = __importStar(require("mysql2/promise"));
class DatabaseManager {
    constructor(config) {
        this.config = config;
        this.datasourceOptions = null;
        this.dataSource = null;
        this.datasourceOptions = config;
    }
    getDataSource() {
        return this.dataSource;
    }
    initializeDataSource() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, this.datasourceOptions), { entities: [models_1.User, models_1.Comment, models_1.Post] }));
            yield this.dataSource
                .initialize()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                console.log("Data Source has been initialized!");
            }))
                .catch((error) => __awaiter(this, void 0, void 0, function* () {
                if (error.code === "ER_BAD_DB_ERROR") {
                    yield this.createDatabaseIfNotExists();
                    yield this.initializeDataSource();
                }
                else {
                    console.error("Error creating database:", error);
                    throw error;
                }
            }));
        });
    }
    createDatabaseIfNotExists() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DATABASE DOES NOT EXISTS, CREATING DATABASE");
            const access = {
                user: "root",
                password: "root",
                database: "mysql",
            };
            const conn = yield mysql.createConnection(access);
            yield conn.query(`CREATE DATABASE IF NOT EXISTS ${this.datasourceOptions.database}`);
            yield conn.end();
        });
    }
    dropDatabaseIfExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const access = {
                user: "root",
                password: "root",
                database: "mysql",
            };
            const conn = yield mysql.createConnection(access);
            yield conn.query(`DROP DATABASE IF EXISTS ${this.datasourceOptions.database}`);
            yield conn.end();
        });
    }
    disconnectDataSource() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataSource) {
                yield this.dataSource.dropDatabase();
                yield this.dataSource.destroy();
            }
        });
    }
}
exports.default = DatabaseManager;
//# sourceMappingURL=dbManager.js.map