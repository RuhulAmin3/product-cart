import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
const router = express.Router();

const allRoutes = [{ path: "/auth", route: authRoutes }];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
