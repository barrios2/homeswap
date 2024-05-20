import express from "express";
import { createSwapRequest, getSwapRequest } from "../controllers/swap.js";
import { verifyUser } from "../util/verifyUser.js";

const swapRouter = express.Router();

swapRouter.post("/create", verifyUser, createSwapRequest);
swapRouter.get("/requests/:id", verifyUser, getSwapRequest);

export default swapRouter;
