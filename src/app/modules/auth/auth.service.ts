import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import { User } from "../users/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //check user exist

  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }
  //match password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError("Password not matched", httpStatus.UNAUTHORIZED);
  }

  //create access token
  //   const accessToken = jwt.sign({
  //     id: isUserExist.id,
  //     role: isUserExist.role,
  //   },

  //   config.jwt.secret as Secret, {
  //     expiresIn: config.jwt.access_expires_in,
  //   } )
  //   const refreshToken = jwt.sign({
  //     id: isUserExist.id,
  //     role: isUserExist.role,
  //   },

  //   config.jwt.refresh_secret as Secret, {
  //     expiresIn: config.jwt.refresh_expires_in,
  //   } )
  const { id: userId, role, needsPasswordChanged } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.access_expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  console.log({ accessToken, refreshToken, needsPasswordChanged });

  return {
    accessToken,
    refreshToken,
    needsPasswordChanged,
  };
};

const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  //verify token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError("Invalid Refresh Token", httpStatus.FORBIDDEN);
  }
  //check user exist
  const { userId } = verifiedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError("user not found", httpStatus.NOT_FOUND);
  }
  //create new access token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.access_expires_in as string
  );
  // const newRefreshToken= jwtHelpers.createToken({id:isUserExist.id, role:isUserExist.role}, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshTokenService,
};
