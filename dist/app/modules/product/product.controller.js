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
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncTryCatch_1 = require("../../../shared/asyncTryCatch");
const genericResponse_1 = __importDefault(require("../../../shared/genericResponse"));
const getQuery_1 = require("../../../shared/getQuery");
const product_services_1 = require("./product.services");
const createProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    const result = yield product_services_1.productServices.createProduct(productData);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product created successfully",
        data: result,
    });
}));
const getAllProducts = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = (0, getQuery_1.getQuery)(req.query, ["searchTerm"]);
    const result = yield product_services_1.productServices.getAllProducts(searchTerm);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "all product retrieved successfully",
        data: result,
    });
}));
const getProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_services_1.productServices.getProduct(id);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product retrieved successfully",
        data: result,
    });
}));
const updateProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const productData = req.body;
    const result = yield product_services_1.productServices.updateProduct(id, userId, productData);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const result = yield product_services_1.productServices.deleteProduct(id, userId);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "product deleted successfully",
        data: result,
    });
}));
exports.productController = {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
};
