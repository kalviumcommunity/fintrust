import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt"; // Import the function to verify JWT tokens
import User from "../services/user.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const usertoken = verifyToken(token);

    const userId = usertoken.userId;

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = new User({});

    const userFound = await user.getUserByUserid(userId);

    if (!userFound) {
      return res.status(401).json({ error: "Authentication required" });
    }

    req.user = userFound;

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
