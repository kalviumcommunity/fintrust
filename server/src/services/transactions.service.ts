import TransactionBase from "../models/TransactionClass";


class Transaction extends TransactionBase {

  constructor(transactionDetails: any) {
    super(transactionDetails)
  }

  public async addEntry() {
    try {
      const result = await this.db.execute(
        "INSERT INTO transactions (account_id, type, user_id, amount, branch_id) VALUES (?, ?, ?, ?, ?)",
        [this.account_id, this.type, this.user_id, this.amount, this.branch_id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

}

export default Transaction;
