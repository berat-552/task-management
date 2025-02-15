import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { isValidObjectId } from "../util/isValidObjectId";

const checkUserExists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id || req.body.user_id;

    if (!isValidObjectId(userId)) {
      res.status(400);
      throw new Error("Invalid user ID");
    }

    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      res.status(404);
      throw new Error("User does not exist");
    }

    next();
  }
);

export default checkUserExists;
