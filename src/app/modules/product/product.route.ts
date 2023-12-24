import { productValidation } from "./product.validation";
import express from "express";
import { productController } from "./product.controller";
import { dataValidation } from "../../middlewares/dataValidation";
import { authenticate } from "../../middlewares/authenticate";
const router = express.Router();

router.post(
  "/",
  authenticate(),
  dataValidation(productValidation.createProductSchema),
  productController.createProduct
);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.patch(
  "/:id",
  authenticate(),
  dataValidation(productValidation.updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", authenticate(), productController.deleteProduct);

export const productRoutes = router;
