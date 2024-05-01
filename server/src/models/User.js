import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["username", "email", "password", "confirmPassword"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.username == null) {
    errorList.push("username is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password !== userObject.confirmPassword) {
    errorList.push("password and confirm password do not match");
  }

  return errorList;
};

export default User;
