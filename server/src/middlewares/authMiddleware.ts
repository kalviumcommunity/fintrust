import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt"; // Import the function to verify JWT tokens
import User from "../models/user";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token)
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const usertoken = verifyToken(token);

    const userId = usertoken.userId
    console.log(usertoken.userId)
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    console.log(user)
    req.user = user;


    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
