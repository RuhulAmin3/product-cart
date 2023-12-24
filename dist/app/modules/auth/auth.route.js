"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const dataValidation_1 = require("../../middlewares/dataValidation");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, dataValidation_1.dataValidation)(auth_validation_1.authValidation.registerSchema), auth_controller_1.authController.registerUser);
router.post("/login", auth_controller_1.authController.loginUser);
router.post("/refresh-token", auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
