import express from "express";
import {
  /*createUser, getUsers,*/ signUp,
  login,
} from "../controllers/user.js";

const userRouter = express.Router();

//userRouter.get("/", getUsers);
userRouter.post("/create", signUp);
userRouter.post("/login", login);

export default userRouter;
