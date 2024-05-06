import User, { validateLogin, validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};
*/

export const signUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const errorList = validateUser({
    username,
    email,
    password,
    confirmPassword,
  });

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const errorList = validateLogin({
    email,
    password,
  });

  if (errorList.length > 0) {
    return res
      .status(400)
      .json({ success: false, msg: validationErrorMessage(errorList) });
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect email or password" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      username: validUser._doc.username,
      email: validUser._doc.email,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to sign in, try again later" });
  }
};
