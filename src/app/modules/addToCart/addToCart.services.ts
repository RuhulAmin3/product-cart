import { AddToCart } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import createHttpError from "http-errors";

const addProductToCart = async (payload: AddToCart): Promise<AddToCart> => {
  const isExistProductToCart = await prisma.addToCart.findFirst({
    where: {
      productId: payload.productId,
      size: payload.size,
      color: payload.color,
      userId: payload.userId,
    },
  });

  if (isExistProductToCart) {
    throw new createHttpError.BadRequest(
      "product already exist to the cart with same size an color."
    );
  }

  const result = await prisma.addToCart.create({
    data: payload,
    include: {
      products: true,
    },
  });

  return result;
};

const getAllCartProducts = async (userId: string): Promise<AddToCart[]> => {
  const result = await prisma.addToCart.findMany({
    where: {
      userId,
    },
    include: {
      products: true,
    },
  });

  return result;
};

const getCartProduct = async (
  id: string,
  userId: string
): Promise<AddToCart> => {
  const result = await prisma.addToCart.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      products: true,
    },
  });

  if (!result) {
    throw new createHttpError.NotFound("product not found");
  }

  return result;
};

const updateCartProduct = async (
  id: string,
  userId: string,
  payload: Partial<AddToCart>
): Promise<AddToCart> => {
  const result = await prisma.addToCart.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!result) {
    throw new createHttpError.NotFound("product not found");
  }

  const updatedResult = await prisma.addToCart.update({
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
};

const deleteCartProduct = async (id: string, userId: string) => {
  const result = await prisma.addToCart.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!result) {
    throw new createHttpError.NotFound("product not found");
  }

  await prisma.addToCart.delete({
    where: {
      id,
      userId,
    },
  });
};

export const addToCartServices = {
  getAllCartProducts,
  getCartProduct,
  updateCartProduct,
  addProductToCart,
  deleteCartProduct,
};
