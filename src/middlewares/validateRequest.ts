import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors/AppError";

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies
    });

    if (!result.success) {
      const errorDetails = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));

      throw new AppError(400, "Validation Error", errorDetails);
    }

    const parsedData = result.data as {
      body?: unknown;
      query?: unknown;
      params?: unknown;
      cookies?: unknown;
    };

    req.body = parsedData.body || req.body;
    req.query = parsedData.query || req.query;
    req.params = parsedData.params || req.params;

    next();
  };
};