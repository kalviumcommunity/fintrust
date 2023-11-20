import { Request, Response } from "express";
// @ts-ignore
import { CurrentAccount, SavingAccount } from "../services/account.service";
import AccountBase from "../models/AccountClass";

async function generateAccountNumber(): Promise<String> {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return "FIN" + randomNumber;
}
async function createAccount(req: Request, res: Response) {
  const { accountType } =
    req.body;

  const userId = req.user.id;

  try {
    let newAccount: any;

    const accountNumber = await generateAccountNumber();

    if (accountType === "savings") {
      const saving = new SavingAccount({...req.body, accountNumber, userId});
      newAccount = await saving.createAccount();
    } else if (accountType === "current") {
      const current = new CurrentAccount({...req.body,accountNumber, userId});
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
  const { accountIds } = req.body;

  try {
    if (!accountIds || !Array.isArray(accountIds) || accountIds.length === 0) {
      return res.status(422).json({ message: "Please provide valid account IDs" });
    }

<<<<<<< Updated upstream
    account.destroy()
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
    return res.status(200).json({ message: "Account Deleted successfully" });
=======
    for (const accountId of accountIds) {
      const account = new AccountBase({ accountId });
      await account.deleteAccount();
    }

    return res.status(200).json({ message: "Accounts deleted successfully" });
>>>>>>> Stashed changes
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error deleting accounts", details: error.message });
  }
}


async function updateBalance(req: Request, res: Response) {
  const { accountId, amount, type } = req.body;

  try {
    if (!amount || !type) {
      return res.status(422).json({ message: "Please fill all the details" });
    }

    const account = new AccountBase({ accountId });
    const currentBalance:number = await account.getBalance();
    let newBalance;

    if (type === "credit") {
      newBalance = currentBalance + amount;
    } else if (type === "withdraw") {
      newBalance = currentBalance - amount;
      if (newBalance < 0) {
        return res.status(422).json({ message: "Insufficient Balance" });
      }
    }
    else{
      return res.status(422).json({ message: "Please provide valid credentials" });
    }

    await account.updateBalance(newBalance);
    const updatedBalance:number = await account.getBalance()

    return res.status(200).json({
      message: "Account Updated successfully",
      updatedBalance,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error updating balance", details: error.message });
  }
}

async function getBalance(req: Request, res: Response) {
  const accountDataArray = req.body;

  try {
    if (!accountDataArray || !Array.isArray(accountDataArray) || accountDataArray.length === 0) {
      return res.status(422).json({ message: "Please provide valid account data array" });
    }

    const balances: any[] = [];

    for (const accountData of accountDataArray) {
      const { accountId } = accountData;
      if (!accountId) {
        return res.status(422).json({ message: "Please provide valid account ID in each account data object" });
      }

      const account = new AccountBase({ accountId });
      const balance = await account.getBalance();
      balances.push({ ...accountData, balance });
    }

    return res.status(200).json({ balances });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching balances", details: error.message });
  }
}

<<<<<<< Updated upstream
export { createAccount, deleteAccount };
=======
async function getDetails(req: Request, res: Response) {
  const userId = req.user.id;
  try {
    const account = new AccountBase({ userId });
    const accountDetails: any = await account.getAccountDetails();
    const test = await account.getAccountDetailsWithBalanceSum()
    accountDetails.forEach((account: any) => {
      delete account.password;
      delete account.created_at;
      delete account.updated_at;
      delete account.user_id;
      delete account.id;
      delete account.branch_id;
    });
    
    account.destroy()
    return res.status(200).json({ accountDetails,test, message: "" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating account", details: error.message });
  }
}

<<<<<<< Updated upstream
async function getDetails(req: Request, res: Response) {
  const userId = req.user.id;
  try {
    const account = new AccountBase({ userId });
    const accountDetails: any = await account.getAccountDetails();
    const test = await account.getAccountDetailsWithBalanceSum()
    accountDetails.forEach((account: any) => {
      delete account.password;
      delete account.created_at;
      delete account.updated_at;
      delete account.user_id;
      delete account.id;
      delete account.branch_id;
    });
    
    account.destroy()
    return res.status(200).json({ accountDetails,test, message: "" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error creating account", details: error.message });
  }
}

export { createAccount, deleteAccount, getDetails };
=======
export { createAccount, deleteAccount, getDetails, updateBalance, getBalance };
>>>>>>> Stashed changes
>>>>>>> Stashed changes
