"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addToCart_route_1 = require("./../modules/addToCart/addToCart.route");
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const router = express_1.default.Router();
const allRoutes = [
    { path: "/auth", route: auth_route_1.authRoutes },
    { path: "/products", route: product_route_1.productRoutes },
    { path: "/cart", route: addToCart_route_1.addToCartRoutes },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
