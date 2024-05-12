//we will create account route
//Step 13 will be here
//get the accounts from db
//get the middlewares for the authentication
const express = require("express");
const { authMiddleware } = require("../middleware");
const { account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  //user to get its balance
  //first we need to find the account of that user using its id
  const Account = await account.findOne({
    userId: req.userId,
  });
  //   console.log(Account);
  res.json({
    balance: Account.balance,
  });
});

/*
In MongoDB, a transaction refers to a set of operations that are grouped together and executed as a single,
atomic unit. This means that either all operations within the transaction succeed or none of them do.
*/
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  //now we need to transfer the money from one user account to another user account
  const session = await mongoose.startSession();
  session.startTransaction();
  //first we take the user from which we have to take the amount
  const { to, amount } = req.body;
  console.log(req.body);
  //now check if the account is there and if there is balance in it and
  //also check if there is the account of the user we need to transfer money is also there

  //this returns a promise so take it in await
  const Account = await account
    .findOne({ userId: req.userId })
    .session(session); //method ensures that this operation is within the transaction session.
  //   console.log(Account);
  if (!Account || Account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await account.findOne({ userId: to }).session(session);
  //   console.log(toAccount);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  //perform the transaction
  await account
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);
  await account
    .updateOne({ userId: to }, { $inc: { balance: amount } })
    .session(session);

  //now commit the session
  await session.commitTransaction();

  //now tell this
  res.json({
    message: "Transfer successful",
  });
});

module.exports = accountRouter;
