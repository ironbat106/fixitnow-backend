import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
import config from "../config";
import { AppError } from "../errors/AppError";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let errorDetails: unknown = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.errorDetails;
  } else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorDetails = err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;
    if (err.code === "P2002") {
      message = "Duplicate value already exists";
      errorDetails = err.meta;
    } else if (err.code === "P2025") {
      message = "Requested record was not found";
      errorDetails = err.meta;
    } else if (err.code === "P2003") {
      message = "Invalid relation id";
      errorDetails = err.meta;
    } else {
      message = err.message;
      errorDetails = err.meta;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid database query input";
    errorDetails = err.message;
  } else if (err instanceof Error) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      statusCode = httpStatus.UNAUTHORIZED;
      message = "Invalid or expired token";
      errorDetails = err.message;
    } else {
      message = err.message;
      errorDetails = config.nodeEnv === "development" ? err.stack : null;
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails
  });
};
