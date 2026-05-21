import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401).json({
          message: "User not found",
        });

        return;
      }

      req.user = user;

      next();
    } else {
      res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};



// PROTECT MIDDLEWARE
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response,next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({
            message: "User not authenticated",
        });
      return;
    }

    if (!roles.includes(req.user.role)) {
        res.status(403).json({
            message: "Access denied, You are not an admin.",
        });

      return;
    }

    next();
  };
};