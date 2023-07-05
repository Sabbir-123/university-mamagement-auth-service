/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../students/students.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChanged: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
