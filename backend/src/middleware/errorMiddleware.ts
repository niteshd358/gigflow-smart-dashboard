import {  Request, Response,NextFunction} from "express";

const errorHandler = (err: any,req: Request,res: Response, next: NextFunction) => {
    console.error(err);

  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
  });
};

export default errorHandler;