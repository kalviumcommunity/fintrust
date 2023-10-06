const mysql = require("mysql2/promise");


interface AccountInterface {
  id: number;
  accountNumber: string;
  balance: number;
  userId: number;
  type: string;
  db:any
  createAccount(user: any): Promise<any>;
  // getUserByUsername(username: any): Promise<any>;
  // comparePasswords(candidatePassword: any, hashedPassword: any): Promise<boolean>;
  // checkDuplicate(email: any, username: any, phoneNumber: any): Promise<any>;
}

// Define an abstract class UserBase that implements IUser
abstract class AccountBase implements AccountInterface {
  public id!:number
  accountNumber!: string;
  balance!: number;
  userId!: number;
  type!: string;
  db:any


  constructor(user:any) {
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.id = 0;
    this.accountNumber = '';
    this.balance = 0;
    this.userId = 0;
  }

  // Define abstract methods that subclasses must implement
  abstract createAccount(user: Partial<AccountInterface>): Promise<string>;
  // abstract checkDuplicate(email: string, username: string, phoneNumber: string): Promise<boolean>;
  // abstract getUserByUsername(username: string): Promise<AccountInterface | null>;
  // abstract comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}

export default AccountBase;