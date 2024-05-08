import express from "express";
import { uploadProperty, getProperties } from "../controllers/property.js";
import { verifyUser } from "../util/verifyUser.js";

const propertyRouter = express.Router();

propertyRouter.post("/upload", verifyUser, uploadProperty);
propertyRouter.get("/get", getProperties);

export default propertyRouter;
