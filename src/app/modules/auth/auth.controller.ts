import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await AuthService.loginUser(logInData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  logInUser,
};
