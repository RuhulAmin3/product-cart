import httpStatus from "http-status";
import { asyncTryCatch } from "../../../shared/asyncTryCatch";
import genericResponse from "../../../shared/genericResponse";
import { getQuery } from "../../../shared/getQuery";
import { productServices } from "./product.services";

const createProduct = asyncTryCatch(async (req, res, next) => {
  const productData = req.body;
  const result = await productServices.createProduct(productData);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product created successfully",
    data: result,
  });
});

const getAllProducts = asyncTryCatch(async (req, res, next) => {
  const { searchTerm } = getQuery(req.query, ["searchTerm"]);
  const result = await productServices.getAllProducts(searchTerm as string);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "all product retrieved successfully",
    data: result,
  });
});

const getProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const result = await productServices.getProduct(id);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product retrieved successfully",
    data: result,
  });
});

const updateProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const productData = req.body;
  const result = await productServices.updateProduct(id, userId, productData);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product updated successfully",
    data: result,
  });
});

const deleteProduct = asyncTryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await productServices.deleteProduct(id, userId);
  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "product deleted successfully",
    data: result,
  });
});

export const productController = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
