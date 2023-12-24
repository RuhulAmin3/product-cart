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
exports.productServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const http_errors_1 = __importDefault(require("http-errors"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.product.create({
        data: payload,
    });
    if (!result) {
        throw new http_errors_1.default.BadRequest("failed to create products");
    }
    return result;
});
const getAllProducts = (searchOption) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = ["category", "title"];
    const conditions = [];
    if (searchOption) {
        conditions.push({
            OR: searchFields.map((field) => ({
                [field]: {
                    contains: searchOption,
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereConditions = conditions.length > 0 ? { AND: conditions } : {};
    const result = yield prisma_1.prisma.product.findMany({
        where: whereConditions,
    });
    return result;
});
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.product.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("Product Not Found");
    }
    return result;
});
// where: {
//     OR: [
//       {
//         category: {
//           contains: searchOption,
//           mode: "insensitive",
//         },
//       },
//       {
//         title: {
//           contains: searchOption,
//           mode: "insensitive",
//         },
//       },
//     ],
//   },
const updateProduct = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const productOwner = yield prisma_1.prisma.product.findFirst({
        where: {
            id: id,
            userId,
        },
    });
    if (!productOwner) {
        throw new http_errors_1.default.BadRequest("you can update only your products");
    }
    const result = yield prisma_1.prisma.product.update({
        where: {
            id: id,
            userId,
        },
        data: payload,
    });
    return result;
});
const deleteProduct = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield prisma_1.prisma.product.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("Product Not Found");
    }
    result = yield prisma_1.prisma.product.findUnique({ where: { id, userId } });
    if (!result) {
        throw new http_errors_1.default.BadRequest("you can only delete your product");
    }
    yield prisma_1.prisma.product.delete({ where: { id, userId } });
});
exports.productServices = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
