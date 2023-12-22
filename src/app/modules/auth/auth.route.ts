import express from "express";
import { authController } from "./auth.controller";
import { dataValidation } from "../../middlewares/dataValidation";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/register",
  dataValidation(authValidation.registerSchema),
  authController.registerUser
);

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;
