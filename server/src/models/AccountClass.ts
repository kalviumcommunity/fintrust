const mysql = require("mysql2/promise");

interface AccountInterface {
  accountId:number
  accountNumber: string;
  balance: number;
  userId: number;
  type: string;
  branch_id: number;
  db: any;
  deleteAccount(user: any): Promise<any>;
}

// Define an abstract class UserBase that implements IUser
 class AccountBase implements AccountInterface {
  accountId!:number
  accountNumber!: string;
  balance!: number;
  userId!: number;
  type!: string;
  branch_id!: number;
  db: any;

  constructor(accountData: any) {
    const { accountId,accountType, accountNumber, balance, userId, branch_id } =
      accountData;
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.accountId = accountId
    this.type = accountType;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.userId = userId;
    this.branch_id = branch_id;
  }

  public async deleteAccount(): Promise<string> {
    // implementation goes here
    const result = await this.db.execute(`DELETE FROM accounts WHERE account_id = ${this.accountId}`);
    return result
  }
 
}

export default AccountBase;
