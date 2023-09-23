// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/user";
import { Op } from "sequelize";
import { generateToken } from "../helpers/jwt";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, address, phonenumber } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(201).json({ message: "404444" });
    }
    console.log(username, email, password);
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already in use." });
    }
    const user = new User({
      username,
      email,
      address,
    });

    await user.setPassword(password);
    await user.save();


    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create user." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Could not log in user." });
  }
};


