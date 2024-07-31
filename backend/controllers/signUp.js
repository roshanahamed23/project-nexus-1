import bcrypt from "bcrypt";
import validator from "validator";
import { userModel } from "../models/User.js";

const validateSignup = async (req) => {
  const { name, email, password } = req.body;
  const errors = {};

  if (name.trim().length === 0) {
    errors.name = "Enter a name field";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Enter a valid email address";
  }

  if (password.trim().length === 0) {
    errors.password = "Enter a password field";
  } else if (password.trim().length <= 5) {
    errors.password = "The minimum length of the password is 6";
  }

  const existingUser = await userModel.findOne({ email }).exec();
  if (existingUser) {
    errors.email = "The account already exists";
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }
};

export const signUp = async (req, res) => {
  try {
    await validateSignup(req);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    res.status(200).json({
      message: "The account was created successfully",
      id: user._id,
    });
  } catch (errors) {
    res.status(400).json({ errors });
  }
};
