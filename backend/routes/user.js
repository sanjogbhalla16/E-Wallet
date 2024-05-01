const express = require("express");
const zod = require("zod");
import { user, account } from "../db";
import { JWT_SECRET } from "../config";
import { sign } from "jsonwebtoken";
import authMiddleware from "../middleware";
const app = express();

const userRouter = Router();
const userSchema = zod.object({
  //username
  //first name
  //last name
  //password
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  //we need to get the input here
  //zod validate it by using safeParse
  const response = userSchema.safeParse(req.body);
  if (!response.success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  //now we need to see for username is already there or not from the database
  //this below code takes time to give answer so we use await here
  const existingUser = await user.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  //this will also take time
  const user = await create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  //we also get the userid for db that we have made
  const userId = user._id;

  //we need to create Account for this user

  await _create({
    userId: userId,
    balance: 1 + Math.random() * 1000,
  });

  // Create a JWT token with a payload (e.g., user ID)
  // const payload = { userId: user.id };
  // const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
  const token = sign(
    {
      userId,
    },
    JWT_SECRET
  );
  //now send these tokens back to the client
  res.json({
    message: "User created Successfully",
    token: token,
  });
});

//now we make the signin request
//first create schema for zod
const signinBody = object({
  username: string().email(),
  password: string(),
});

userRouter.post("/signin", async (req, res) => {
  //first we authorize the input
  const response = userSchema.safeParse(req.body);
  if (!response.success) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
  //now we see if there exists a user
  //this process will take time so we need to await this
  const existingUser = await findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingUser) {
    // we got an existing user
    //we need to return the token
    const token = sign({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

//we first make the schema from zod
const updateUser = object({
  password: string().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
});
//we need to return these above info and show it in the frontend
userRouter.put("/", authMiddleware, async (req, res) => {
  const response = updateUser.safeParse(req.body);

  if (!response.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  //the authentication is already done in the request no we need to update the data
  //we choose User because in Mongoose we use model
  //so Model.updateOne()
  await updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

//It retrieves users from a MongoDB database based on a filter provided as a query parameter
//and responds with JSON data containing the filtered users' information.

/*

//get query&params in express

//etc. example.com/user/000000?sex=female

app.get('/user/:id', function(req, res) {

  const query = req.query;// query = {sex:"female"}

  const params = req.params; //params = {id:"000000"}

})
*/
userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const user = await find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default userRouter;
