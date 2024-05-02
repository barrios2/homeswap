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

  userObject.username = userObject.username.trim();
  userObject.email = userObject.email.trim();

  if (userObject.username.includes(" ")) {
    errorList.push("username cannot contain empty spaces");
  }

  if (userObject.username == null) {
    errorList.push("username is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password.length < 8) {
    errorList.push("password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(userObject.password)) {
    errorList.push("password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(userObject.password)) {
    errorList.push("password must contain at least one lowercase letter");
  }

  if (!/\d/.test(userObject.password)) {
    errorList.push("password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(userObject.password)) {
    errorList.push("password must contain at least one special character");
  }

  if (userObject.password !== userObject.confirmPassword) {
    errorList.push("password and confirm password do not match");
  }

  return errorList;
};

export default User;
