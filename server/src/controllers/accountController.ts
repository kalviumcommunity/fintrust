
import { Request, Response } from "express";
import Account from "../models/account"; 


async function generateAccountNumber(): Promise<number> {
  const randomNumber = Math.floor(Math.random() * 1000000000000)
  return randomNumber;
}
async function createAccount(req: Request, res: Response) {
  const { accountType, balance, interestRate, overdraftLimit } = req.body;


  const userId = req.user.id
 
  try {

const existingAccount:any = await Account.findAll({
      where: {
        userId,
            type: accountType,
      },
    });

    if (existingAccount.length>2) {
    
      return res.status(400).json({ error: "Customer already has an account of the same type" });
    }

    const accountNumber = await generateAccountNumber();

    const account = await Account.create({
      accountNumber,
      balance,
      userId,
      type: accountType
    });

   
    if (accountType === "savings") {
      await account.setInterestRate(23);
    } else if (accountType === "current") {
      await account.setOverDraftLimit(4455);
    } else {
      return res.status(400).json({ error: "Invalid account type" });
    }

    await account.save(); 

    return res.status(201).json({ message: "Account created successfully", account });
  } catch (error:any) {
    return res.status(500).json({ error: "Error creating account", details: error.message });
  }
}

export { createAccount };
