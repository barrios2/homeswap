import express from "express";
import { createSwapRequest } from "../controllers/swap.js";
import { verifyUser } from "../util/verifyUser.js";

const swapRouter = express.Router();

swapRouter.post("/create", verifyUser, createSwapRequest);

export default swapRouter;
