"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dataValidation_1 = require("../../middlewares/dataValidation");
const addToCart_validation_1 = require("./addToCart.validation");
const authenticate_1 = require("../../middlewares/authenticate");
const addToCart_controller_1 = require("./addToCart.controller");
const router = express_1.default.Router();
router.post("/", (0, authenticate_1.authenticate)(), (0, dataValidation_1.dataValidation)(addToCart_validation_1.addToCartValidtion.createAddToCartSchema), addToCart_controller_1.addToCartController.addProductToCart);
router.get("/", (0, authenticate_1.authenticate)(), addToCart_controller_1.addToCartController.getAllCartProducts);
router.get("/:id", (0, authenticate_1.authenticate)(), addToCart_controller_1.addToCartController.getCartProduct);
router.patch("/:id", (0, authenticate_1.authenticate)(), (0, dataValidation_1.dataValidation)(addToCart_validation_1.addToCartValidtion.createAddToCartSchema), addToCart_controller_1.addToCartController.updateCartProduct);
router.delete("/:id", (0, authenticate_1.authenticate)(), addToCart_controller_1.addToCartController.deleteCartProduct);
exports.addToCartRoutes = router;
