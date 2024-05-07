import express from "express";
import { uploadProperty } from "../controllers/property.js";
import { verifyUser } from "../util/verifyUser.js";

const propertyRouter = express.Router();

propertyRouter.post("/upload", verifyUser, uploadProperty);

export default propertyRouter;
