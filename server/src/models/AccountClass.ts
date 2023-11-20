const mysql = require("mysql2/promise");

interface AccountInterface {
  accountId: number;
  accountNumber: string;
  balance: number;
  userId: number;
  type: string;
  branch_id: number;
  db: any;
  getAccountDetails(user: any): Promise<any>;
}

// Define an abstract class UserBase that implements IUser
class AccountBase implements AccountInterface {
  accountId!: number;
  accountNumber!: string;
  balance!: number;
  userId!: number;
  type!: string;
  branch_id!: number;
  db: any;

  constructor(accountData: any) {
    console.log("base class constructor  called")
    const {
      accountId,
      accountType,
      accountNumber,
      balance,
      userId,
      branch_id,
    } = accountData;
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    this.accountId = accountId;
    this.type = accountType;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.userId = userId;
    this.branch_id = branch_id;
  }

  public async deleteAccount(): Promise<string> {
    // implementation goes here
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    const result = await this.db.execute(`DELETE FROM accounts WHERE account_id = ${this.accountId}`);
    return result
=======
>>>>>>> Stashed changes
    const result = await this.db.execute(
      `DELETE FROM accounts WHERE account_id = ${this.accountId}`
    );
    return result;
  }

  public async getAccountDetails(): Promise<any[]> {
    try {
      const [rows, fields] = await this.db.execute(
        `
        SELECT *
        FROM accounts a
        INNER JOIN users u ON a.user_id = u.id
        INNER JOIN branch b ON a.branch = b.branch_id
        WHERE u.id = ?`,
        [this.userId]
      );
  
      return rows; 
    } catch (error) {
      throw error; // Handle errors appropriately
    }
  }

  public async getAccountDetailsWithBalanceSum(): Promise<any[]> {
    try {
      const [rows, fields] = await this.db.execute(
        `
        SELECT *,
          (SELECT SUM(balance) FROM accounts subaccount WHERE subaccount.user_id = a.user_id) as totalBalance
        FROM accounts a
        INNER JOIN users u ON a.user_id = u.id
        INNER JOIN branch b ON a.branch = b.branch_id
        WHERE u.id = ?`,
        [this.userId]
      );
  
      return rows; // Return the rows as an array of objects with an additional 'totalBalance' field
    } catch (error) {
      throw error; // Handle errors appropriately
    }
  }

<<<<<<< Updated upstream
=======
  public async getBalance(): Promise<number> {
    // implementation goes here
    const result = await this.db.execute(
      `SELECT balance FROM accounts WHERE account_id = ${this.accountId}`
    );
  
    const balance = parseFloat(result[0][0].balance);
    return balance;
  }
  

  public async updateBalance(newBalance: number): Promise<void> {
    try {
      // Use a SQL UPDATE query to update the balance in the database
      const result = await this.db.execute(
        'UPDATE accounts SET balance = ? WHERE account_id = ?',
        [newBalance, this.accountId]
      );

      if (result[0].affectedRows === 1) {
        // The update was successful
        this.balance = newBalance; 
        return result
      } else {
        throw new Error('Failed to update balance');
      }
    } catch (error) {
      throw error;
    }
  }
 

>>>>>>> Stashed changes
  public async getAccountDetailsWithBalanceSumUnion(): Promise<any[]> {
    try {
      const [rows, fields] = await this.db.execute(
        `
        SELECT a.*, u.*, b.*, NULL as totalBalance
        FROM accounts a
        INNER JOIN users u ON a.user_id = u.id
        INNER JOIN branch b ON a.branch_id = b.branch_id
        WHERE u.id = ?
        
        UNION
  
        SELECT a.*, u.*, b.*, SUM(subaccount.balance) as totalBalance
        FROM accounts a
        INNER JOIN users u ON a.user_id = u.id
        INNER JOIN branch b ON a.branch_id = b.branch_id
        INNER JOIN accounts subaccount ON a.user_id = subaccount.user_id
        WHERE u.id = ?
        GROUP BY a.account_id
        `,
        [this.userId, this.userId]
      );
  
      return rows; // Return the rows as an array of objects with an additional 'totalBalance' field
    } catch (error) {
      throw error; // Handle errors appropriately
    }
  }
  
  

  destroy() {
    this.db.end();
    console.log("descturcotr called")
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  }
}

export default AccountBase;
