"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_validation_1 = require("./product.validation");
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const dataValidation_1 = require("../../middlewares/dataValidation");
const authenticate_1 = require("../../middlewares/authenticate");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.authenticate)(), (0, dataValidation_1.dataValidation)(product_validation_1.productValidation.createProductSchema), product_controller_1.productController.createProduct);
router.get("/", product_controller_1.productController.getAllProducts);
router.get("/:id", product_controller_1.productController.getProduct);
router.patch("/:id", (0, authenticate_1.authenticate)(), (0, dataValidation_1.dataValidation)(product_validation_1.productValidation.updateProductSchema), product_controller_1.productController.updateProduct);
router.delete("/:id", (0, authenticate_1.authenticate)(), product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
