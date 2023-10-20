import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt"; // Import the function to verify JWT tokens
import User from "../services/user.service";

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const usertoken = verifyToken(token);

    const userId = usertoken.userId;
    console.log(usertoken.userId);

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = new User({userId})

    const userFound = await user.getUserByUserid(userId)

  
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userFound.role !== 1){
      return res.status(401).json({ message: "You are not Authorized to perform this task" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};
