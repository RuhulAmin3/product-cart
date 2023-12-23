import express from "express";
import { dataValidation } from "../../middlewares/dataValidation";
import { addToCartValidtion } from "./addToCart.validation";
import { authenticate } from "../../middlewares/authenticate";
import { addToCartController } from "./addToCart.controller";

const router = express.Router();

router.post(
  "/",
  authenticate(),
  dataValidation(addToCartValidtion.createAddToCartSchema),
  addToCartController.addProductToCart
);

router.get("/", authenticate(), addToCartController.getAllCartProducts);

router.get("/:id", authenticate(), addToCartController.getCartProduct);

router.patch(
  "/:id",
  authenticate(),
  dataValidation(addToCartValidtion.createAddToCartSchema),
  addToCartController.updateCartProduct
);
router.delete("/:id", authenticate(), addToCartController.deleteCartProduct);

export const addToCartRoutes = router;
