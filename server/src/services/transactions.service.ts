import TransactionBase from "../models/TransactionClass";


class Transaction extends TransactionBase {

  private password!:any;
  constructor(transactionDetails: any) {
    super(transactionDetails)
  }

  public async addEntry() {
    try {
      const [rows, fields] = await this.db.execute(
        "SELECT * FROM users WHERE id = ?",
        []
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

}

export default Transaction;
