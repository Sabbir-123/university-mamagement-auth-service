/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { IGenericErrorMessage } from "../../Interfaces/error";
import config from "../../config";
import handleValidationError from "../../error/handleValidationError";

const globalErrorHandler = (
  err: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = "Something Went Wrong!!!";
  const errorMesages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    // eslint-disable-next-line no-unused-vars
    const simplifiedError = handleValidationError(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMesages,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
