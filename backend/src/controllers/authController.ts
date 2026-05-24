import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import generateToken from "../utils/generateToken";


export const registerUser = async ( req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",

      token: generateToken(user._id.toString()),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};



export const loginUser = async (req: Request,res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid email address",
      });

      return;
    }

    const isPasswordMatch = await bcrypt.compare( password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        message: "Invalid password",
      });

      return;
    }

    res.status(200).json({
      message: "Login successful",

      token: generateToken(user._id.toString()),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};