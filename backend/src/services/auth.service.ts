import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/db";

import { JWT_PASSWORD } from "../config";

export const signupUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return {
    message: "User signed up successfully",
  };
};

export const signinUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_PASSWORD,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
