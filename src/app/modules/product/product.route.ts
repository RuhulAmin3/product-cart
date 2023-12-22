import { productValidation } from "./product.validation";
import express from "express";
import { productController } from "./product.controller";
import { dataValidation } from "../../middlewares/dataValidation";
const router = express.Router();

router.post(
  "/",
  dataValidation(productValidation.createProductSchema),
  productController.createProduct
);
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.patch(
  "/:id",
  dataValidation(productValidation.updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

export const productRoutes = router;
