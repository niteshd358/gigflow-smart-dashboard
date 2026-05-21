import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";

import leadRoutes from "./routes/leadRoutes";

import errorHandler from "./middleware/errorMiddleware";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("GigFlow API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});