import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncTryCatch =
  (cb: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
