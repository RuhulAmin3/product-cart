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
exports.addToCartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncTryCatch_1 = require("../../../shared/asyncTryCatch");
const genericResponse_1 = __importDefault(require("../../../shared/genericResponse"));
const addToCart_services_1 = require("./addToCart.services");
const addProductToCart = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const result = yield addToCart_services_1.addToCartServices.addProductToCart(productData);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product added to the cart successfully",
        data: result,
    });
}));
const getAllCartProducts = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield addToCart_services_1.addToCartServices.getAllCartProducts(userId);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "all added cart product retrieved successfully",
        data: result,
    });
}));
const getCartProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const result = yield addToCart_services_1.addToCartServices.getCartProduct(id, userId);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "single cart add product retrieved successfully",
        data: result,
    });
}));
const updateCartProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const productData = req.body;
    const result = yield addToCart_services_1.addToCartServices.updateCartProduct(id, userId, productData);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "cart product updated successfully",
        data: result,
    });
}));
const deleteCartProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const result = yield addToCart_services_1.addToCartServices.deleteCartProduct(id, userId);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product deleted successfully",
        data: result,
    });
}));
exports.addToCartController = {
    getAllCartProducts,
    getCartProduct,
    updateCartProduct,
    addProductToCart,
    deleteCartProduct,
};
