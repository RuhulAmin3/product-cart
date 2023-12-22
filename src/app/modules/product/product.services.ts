import { Prisma, Product } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import createHttpError from "http-errors";

const createProduct = async (payload: Product): Promise<Product> => {
  const result = await prisma.product.create({
    data: payload,
  });

  if (!result) {
    throw new createHttpError.BadRequest("failed to create products");
  }
  return result;
};

const getAllProducts = async (searchOption: string): Promise<Product[]> => {
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

  const whereConditions: Prisma.ProductWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};
  const result = await prisma.product.findMany({
    where: whereConditions,
  });

  return result;
};

const getProduct = async (id: string): Promise<Product> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createHttpError.NotFound("Product Not Found");
  }

  return result;
};

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

const updateProduct = async (
  id: string,
  userId: string,
  payload: Partial<Product>
): Promise<Product> => {
  const productOwner = await prisma.product.findFirst({
    where: {
      id: id,
      userId,
    },
  });

  if (!productOwner) {
    throw new createHttpError.BadRequest("you can update only your products");
  }

  const result = await prisma.product.update({
    where: {
      id: id,
      userId,
    },
    data: payload,
  });

  return result;
};

const deleteProduct = async (id: string, userId: string) => {
  let result = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createHttpError.NotFound("Product Not Found");
  }

  result = await prisma.product.findUnique({ where: { id, userId } });

  if (!result) {
    throw new createHttpError.BadRequest("you can only delete your product");
  }

  await prisma.product.delete({ where: { id, userId } });
};

export const productServices = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
