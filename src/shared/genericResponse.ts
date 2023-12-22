import { Response } from "express";

type GenericResponseType<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    prevPage: number | null;
    nextpage: number | null;
    totalPages: number | null;
  };
};

const genericResponse = <T>(res: Response, data: GenericResponseType<T>) => {
  return res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
    meta: data.meta || null,
  });
};

export default genericResponse;
