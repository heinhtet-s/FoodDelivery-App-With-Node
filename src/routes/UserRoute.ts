import express, { Request, Response, NextFunction } from "express";
import { UserLogin, UserSignUp } from "../controller";
import { Authentication } from "../middleware/CommonAuth";
const router = express.Router();
router.post("/signup", UserSignUp);

/* ------------------- Login --------------------- */
router.post("/login", UserLogin);

/* ------------------- Authentication --------------------- */
router.use(Authentication);
export { router as UserRoute };
