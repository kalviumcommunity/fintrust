import { Request, Response } from "express";
// @ts-ignore
import { CurrentAccount, SavingAccount } from "../services/account";

async function generateAccountNumber(): Promise<number> {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return randomNumber;
}
async function createAccount(req: Request, res: Response) {
  const { accountType, balance, interestRate, overdraftLimit } = req.body;

  const userId = req.user.id;

  try {
    let newAccount: any;

    const accountNumber = await generateAccountNumber();

    console.log(accountNumber);
    if (accountType === "savings") {
      const saving = new SavingAccount({
        accountType,
        accountNumber,
        balance,
        interestRate,
        userId,
      });
      newAccount = await saving.createAccount({ accountNumber });
    } else if (accountType === "current") {
      const current = new CurrentAccount({
        accountType,
        accountNumber,
        balance,
        overdraftLimit,
        userId,
      });
      newAccount = await current.createAccount({ accountNumber });
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

export { createAccount };
