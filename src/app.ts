import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
export const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", routes);

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} api not found`,
    errorMessages: [{ path: `${req.originalUrl}`, message: "api not found" }],
  });
});
