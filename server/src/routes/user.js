import express from "express";
import { /*createUser*/ getUsers, signUp } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", signUp);

export default userRouter;
