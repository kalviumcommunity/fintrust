import AccountBase from "../models/AccountClass";

export class SavingAccount extends AccountBase {
  public interestRate!: number;

  constructor(data: any) {
    super(data);
    this.interestRate = data.interestRate || 0.5;
  }

  public async createAccount(): Promise<any> {
    const result = await this.db.execute(
      "INSERT INTO accounts ( account_type, account_number, balance, interest_rate, user_id, branch) VALUES (?,?, ?, ?, ?, ?)",
      [
        this.type,
        this.accountNumber,
        this.balance,
        this.interestRate,
        this.userId,
        this.branch_id,
      ]
    );
    return result;
  }
}


export class CurrentAccount extends AccountBase {
  public overdraftLimit!: number;
  constructor(data: any) {
    super(data);
    this.overdraftLimit = data.overdraftLimit || 5;
  }
  public async createAccount(): Promise<any> {
    const result = await this.db.execute(
      "INSERT INTO accounts ( account_type, account_number, balance, overdraft_limit, user_id, branch) VALUES (?,?, ?, ?, ?, ?)",
      [
        this.type,
        this.accountNumber,
        this.balance,
        this.overdraftLimit,
        this.userId,
        this.branch_id,
      ]
    );
    return result;
  }
}
