const mysql = require("mysql2/promise");

interface TransactionInterface {
  user_id: string;
  account_id: number;
  amount: number;
  type: string;
  branch_id: number;
  addEntry(user: any): Promise<any>;
}

// Define an abstract class UserBase that implements IUser
 abstract class TransactionBase implements TransactionInterface {
  user_id!: string;
  account_id!: number;
  amount!: number;
  type!: string;
  branch_id!: number;
  db: any;

  constructor(transationDetails: any) {
    const { accountId,transactionType, amount, userId, branch_id } = transationDetails;
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.account_id = accountId
    this.type = transactionType;
    this.amount = amount;
    this.user_id = userId;
    this.branch_id = branch_id;
  }

  abstract addEntry(username: string): Promise<TransactionInterface | null>;
 
  destroy() {
    this.db.end();
  }
}

export default TransactionBase;
