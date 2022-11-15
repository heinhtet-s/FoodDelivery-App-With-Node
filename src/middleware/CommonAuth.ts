import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dio/Auth.dto";
import { verifyToken } from "../utility/passwordUnility";

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}
export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await verifyToken(req);
  if (!validate) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};
