import { generateToken } from "../helpers/jwt";
import User from "../services/user.service";
import { Request, Response } from "express";

// Controller function to register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, phoneNumber, password, role } = req.body;

  // Create an instance of the User class
  const user = new User({
    username,
    email,
    phoneNumber,
    role,
    password,
  });
  try {
    // Check if any required field is missing
    if (!email || !username || !phoneNumber || !password) {
      return res
        .status(422)
        .json({ message: "Please fill all the credentials" });
    }

    // Check if an account with the same email, username, or phoneNumber already exists
    const userExists = await user.checkDuplicate();
    if (userExists) {
      return res.status(422).json({
        message: "Account already exists with these credentials",
      });
    }
    // Create a new user with the provided data
    const createdUser = await user.createUser(password);

    user.destroy();
    res.status(201).json({ message: "User created successfully", createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to handle user login
export const loginUser = async (req: Request, res: Response) => {
  // Destructure the request body to get username and password
  const { username, password } = req.body;

  // Create an instance of the User class
  const user = new User({ username, password });
  try {
    // Retrieve user data by username
    if(!username || !password){
      return res.status(401).json({ message: "Please fill all the credentials" });
    }
    const userData = await user.getUserByUsername();

    if (!userData) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored password hash

    const passwordsMatch = await user.comparePasswords(
      password,
      userData.password
    );

    // If passwords do not match, send an authentication error
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Remove sensitive information from the user data
    const resUserData = { ...userData };
    delete resUserData.password;
    delete resUserData.role_id;
    delete resUserData.created_at;
    delete resUserData.updated_at;

    // Generate an access token for the user
    const accessToken = await generateToken(userData.id);
    user.destroy();
    res
      .status(200)
      .json({ message: "Login successful", user: resUserData, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller functions
module.exports = { registerUser, loginUser };
