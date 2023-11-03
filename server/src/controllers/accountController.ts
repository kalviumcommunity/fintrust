import { Request, Response } from "express";
// @ts-ignore
import { CurrentAccount, SavingAccount } from "../services/account.service";
import AccountBase from "../models/AccountClass";

async function generateAccountNumber(): Promise<String> {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return "FIN" + randomNumber;
}
async function createAccount(req: Request, res: Response) {
  const { accountType, balance, interestRate, overdraftLimit, branch_id } =
    req.body;

  const userId = req.user.id;

  try {
    let newAccount: any;

    const accountNumber = await generateAccountNumber();

    if (accountType === "savings") {
      const saving = new SavingAccount({
        accountType,
        accountNumber,
        balance,
        interestRate,
        userId,
        branch_id,
      });
      newAccount = await saving.createAccount();
    } else if (accountType === "current") {
      const current = new CurrentAccount({
        accountType,
        accountNumber,
        balance,
        overdraftLimit,
        userId,
        branch_id,
      });
      newAccount = await current.createAccount();
    } else {
      return res.status(400).json({ message: "Invalid account type" });
    }

    return res
      .status(201)
      .json({ message: "Account created successfully", newAccount });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating account", details: error.message });
  }
}

async function deleteAccount(req: Request, res: Response) {
  const { accountId } = req.body;

  try {
    if (!accountId) {
      return res.status(422).json({ message: "Please provide the account ID" });
    }
    const account = new AccountBase({ accountId });
    await account.deleteAccount();

    account.destroy()
    return res.status(200).json({ message: "Account Deleted successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating account", details: error.message });
  }
}

async function getDetails(req: Request, res: Response) {
  const userId = req.user.id;
  try {
    const account = new AccountBase({ userId });
    const accountDetails: any = await account.getAccountDetails();

    accountDetails.forEach((account: any) => {
      delete account.password;
      delete account.created_at;
      delete account.updated_at;
      delete account.user_id;
      delete account.id;
      delete account.branch_id;
    });
    
    account.destroy()
    return res.status(200).json({ accountDetails, message: "" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating account", details: error.message });
  }
}

export { createAccount, deleteAccount, getDetails };
