import httpStatus from "http-status";
import { asyncTryCatch } from "../../../shared/asyncTryCatch";
import genericResponse from "../../../shared/genericResponse";
import { addToCartServices } from "./addToCart.services";

const addProductToCart = asyncTryCatch(async (req, res, next) => {
  const productData = req.body;
  const result = await addToCartServices.addProductToCart(productData);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product added to the cart successfully",
    data: result,
  });
});

const getAllCartProducts = asyncTryCatch(async (req, res, next) => {
  const { userId } = req.user;
  const result = await addToCartServices.getAllCartProducts(userId);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "all added cart product retrieved successfully",
    data: result,
  });
});

const getCartProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await addToCartServices.getCartProduct(id, userId);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "single cart add product retrieved successfully",
    data: result,
  });
});

const updateCartProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const productData = req.body;
  const result = await addToCartServices.updateCartProduct(
    id,
    userId,
    productData
  );
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "cart product updated successfully",
    data: result,
  });
});

const deleteCartProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await addToCartServices.deleteCartProduct(id, userId);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product deleted successfully",
    data: result,
  });
});

export const addToCartController = {
  getAllCartProducts,
  getCartProduct,
  updateCartProduct,
  addProductToCart,
  deleteCartProduct,
};
