import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../users/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
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

  //check if password needs to be changed
  // if(isUserExist?.needsPasswordChanged){
  //     throw new ApiError("Password needs to be changed", httpStatus.UNAUTHORIZED)
  // }

  //create access token

  return {};
};

export const AuthService = {
  loginUser,
};
