import { Request,Response,NextFunction} from "express";

import { ZodType } from "zod";


const validate =

  (schema: ZodType ) =>(req: Request,res: Response,next: NextFunction ): void => {
    
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    req.body = result.data;

    next();
  };

export default validate;