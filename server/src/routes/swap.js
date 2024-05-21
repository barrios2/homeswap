import express from "express";
import {
  createSwapRequest,
  getSwapRequest,
  confirmSwapRequest,
  rejectSwapRequest,
} from "../controllers/swap.js";
import { verifyUser } from "../util/verifyUser.js";

const swapRouter = express.Router();

swapRouter.post("/create", verifyUser, createSwapRequest);
swapRouter.get("/requests/:id", verifyUser, getSwapRequest);
swapRouter.put("/confirm/:requestId", verifyUser, confirmSwapRequest);
swapRouter.put("/reject/:requestId", verifyUser, rejectSwapRequest);

export default swapRouter;
