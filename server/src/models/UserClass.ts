const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

interface UserInterface {
  db: any;
  username: string;
  email: string;
  phoneNumber?: number;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  createUser(user: any): Promise<any>;
  getUserByUsername(username: any): Promise<any>;
  comparePasswords(
    candidatePassword: any,
    hashedPassword: any
  ): Promise<boolean>;
  checkDuplicate(email: any, username: any, phoneNumber: any): Promise<any>;
}

// Define an abstract class UserBase that implements IUser
abstract class UserBase implements UserInterface {
  db: any;
  username: string;
  email: string;
  address: string;
  phoneNumber: number;
  role: number;

  constructor(user: any) {
    const { username, password, email, phoneNumber, address, role } = user;
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.username = username;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }

  // Define abstract methods that subclasses must implement
  abstract createUser(user: Partial<UserInterface>): Promise<string>;
  abstract checkDuplicate(
    email: string,
    username: string,
    phoneNumber: string
  ): Promise<boolean>;
  abstract getUserByUsername(username: string): Promise<UserInterface | null>;
  abstract comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export default UserBase;
