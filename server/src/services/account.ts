import AccountBase from "../models/AccountClass";


export class SavingAccount extends AccountBase {

  public interestRate!:number;

  constructor(data: any) {
   super(data)
  }



  public async createAccount(user:any): Promise<any> {
  //  const result = await this.db.execute(
  //   "INSERT INTO accounts (username, password, email, phoneNumber, address,role_id) VALUES (?, ?, ?, ?, ?,?)",
  //   [this.username, this.password, this.email, this.phoneNumber, this.address, this.role || null]
  //  )
  //  return ''
  throw new Error("Work in progress for saving account")
  }

}


export class CurrentAccount extends AccountBase {

  public overdraftLimit!:number;

  constructor(data: any) {
   super(data)
  }



  public async createAccount(user:any): Promise<any> {
  //  const result = await this.db.execute(
  //   "INSERT INTO accounts (username, password, email, phoneNumber, address,role_id) VALUES (?, ?, ?, ?, ?,?)",
  //   [this.username, this.password, this.email, this.phoneNumber, this.address, this.role || null]
  //  )
  //  return ''
  throw new Error("Work in progress for current account")
  }

}