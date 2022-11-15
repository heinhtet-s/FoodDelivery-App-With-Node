import express, { Request, Response, NextFunction } from "express";
import {
  CustomerLogin,
  CustomerSignUp,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOtp,
} from "../controller";
import { Authentication } from "../middleware/CommonAuth";
const router = express.Router();
router.post("/signup", CustomerSignUp);

/* ------------------- Login --------------------- */
router.post("/login", CustomerLogin);

/* ------------------- Authentication --------------------- */
router.use(Authentication);
/* ------------------- Verify Customer Account --------------------- */
router.patch("/verify", CustomerVerify);
/* ------------------- OTP / request OTP --------------------- */
router.get("/otp", RequestOtp);

/* ------------------- Profile --------------------- */
router.get("/profile", GetCustomerProfile);
router.patch("/profile", EditCustomerProfile);

export { router as CustomerRoute };
