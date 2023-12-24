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
exports.addToCartServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const http_errors_1 = __importDefault(require("http-errors"));
const addProductToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistProductToCart = yield prisma_1.prisma.addToCart.findFirst({
        where: {
            productId: payload.productId,
            size: payload.size,
            color: payload.color,
            userId: payload.userId,
        },
    });
    if (isExistProductToCart) {
        throw new http_errors_1.default.BadRequest("product already exist to the cart with same size an color.");
    }
    const result = yield prisma_1.prisma.addToCart.create({
        data: payload,
        include: {
            products: true,
        },
    });
    return result;
});
const getAllCartProducts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.addToCart.findMany({
        where: {
            userId,
        },
        include: {
            products: true,
        },
    });
    return result;
});
const getCartProduct = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.addToCart.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            products: true,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("product not found");
    }
    return result;
});
const updateCartProduct = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.addToCart.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("product not found");
    }
    const updatedResult = yield prisma_1.prisma.addToCart.update({
        where: {
            id,
            userId,
        },
        data: payload,
        include: {
            products: true,
        },
    });
    return updatedResult;
});
const deleteCartProduct = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.addToCart.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("product not found");
    }
    yield prisma_1.prisma.addToCart.delete({
        where: {
            id,
            userId,
        },
    });
});
exports.addToCartServices = {
    getAllCartProducts,
    getCartProduct,
    updateCartProduct,
    addProductToCart,
    deleteCartProduct,
};
