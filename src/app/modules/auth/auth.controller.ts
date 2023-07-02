import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await AuthService.loginUser(logInData);
  const { refreshToken, ...others } = result;

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshTokenService(refreshToken);

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user logged in successfully",
    data: result,
  });
});

export const AuthController = {
  logInUser,
  refreshToken,
};
