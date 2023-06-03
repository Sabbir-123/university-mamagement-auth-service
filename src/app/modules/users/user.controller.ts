import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

const creatrUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await userService.createUser(user);
    res.status(200).json({
      status: "success",
      message: "User created Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default { creatrUser };
