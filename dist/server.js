"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const envConfig_1 = __importDefault(require("./envConfig"));
const server = app_1.app.listen(envConfig_1.default.port, () => {
    console.log("server running on port", envConfig_1.default.port);
});
const existHandler = () => {
    if (server) {
        server.close((err) => {
            console.log("server is closed", err);
        });
    }
    process.exit(1);
};
const unexpectedErrorHandler = (err) => {
    console.log(err);
    existHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
