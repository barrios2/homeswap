import express from "express";
import { uploadProperty, searchProperties } from "../controllers/property.js";
import { verifyUser } from "../util/verifyUser.js";

const propertyRouter = express.Router();

propertyRouter.post("/upload", verifyUser, uploadProperty);
propertyRouter.get("/search", searchProperties);

export default propertyRouter;
