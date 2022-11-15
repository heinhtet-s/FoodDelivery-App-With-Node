import express, { Request, Response, NextFunction } from "express";
import { createVendor, getVendorByID, getVendors } from "../controller";
const router = express.Router();
router.get("/vandor", getVendors);
router.post("/vandor", createVendor);
router.get("/vandor/:id", getVendorByID);
export { router as AdminRoute };
