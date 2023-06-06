import { RequestHandler } from "express";
import { UserService } from "./user.service";

const creatrUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      status: "success",
      message: "User created Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = { creatrUser };
