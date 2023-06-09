import config from "../../../config/index";
import ApiError from "../../../error/ApiError";

import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUseId } from "./user.util";

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated increamental id
  const id = await generateUseId();
  user.id = id;
  // deault password
  if (!user?.password) {
    user.password = config?.default_User_Pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError("Failed to create User", 400);
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
