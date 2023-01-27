import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../dio/Auth.dto";
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
export const HashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
export const ValidatePassword = async (
  password: string,
  hashPassword: string,
  salt: string
) => {
  return (await HashPassword(password, salt)) === hashPassword;
};
export const generateToken = (payload: AuthPayload) => {
  const { JWT_SECRET }: any = process.env;
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
};
export const verifyToken = async (req: Request) => {
  const { JWT_SECRET }: any = process.env;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return false;
  }
  const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
  req.user = decoded;
  return true;
};
