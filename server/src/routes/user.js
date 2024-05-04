import express from "express";
import {
  /*createUser, getUsers,*/ signUp,
  signIn,
} from "../controllers/user.js";

const userRouter = express.Router();

//userRouter.get("/", getUsers);
userRouter.post("/create", signUp);
userRouter.post("/login", signIn);

export default userRouter;
