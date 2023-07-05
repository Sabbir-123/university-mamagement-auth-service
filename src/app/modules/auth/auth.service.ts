import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import { User } from "../users/user.model";
import {
  IChangePassword,
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
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError("Password is incorrect", httpStatus.UNAUTHORIZED);
  }

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

const changePassword = async (
  user: JwtPayload | null | undefined,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const loggedUser = new User();
  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    "+password"
  );
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError("User does not exist", httpStatus.NOT_FOUND);
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await loggedUser.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError("Old Password is incorrect", httpStatus.UNAUTHORIZED);
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChanged = false;

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshTokenService,
  changePassword,
};
