import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { IGenericErrMessage } from "../../interfaces/error";
import { ZodError } from "zod";
import { handleZodError } from "../../errors/zodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "something is wrong";
  let errorMessages: IGenericErrMessage[] = [];

  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.name;
    errorMessages = zodError.errorMessages;
  } else if (err instanceof Error) {
    message = err.name;
    statusCode = (err as any).status;
    errorMessages = [{ path: "", message: err.message }];
  }

  console.log("err from global", err);
  res.status(statusCode).json({
    success: false,
    name: message,
    errorMessages,
  });
};

export default globalErrorHandler;
