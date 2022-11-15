import express, { Request, Response, NextFunction } from "express";
import path from "path";
import {
  AddFood,
  GetVendorProfile,
  UpdateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controller";
import { Authentication } from "../middleware/CommonAuth";
import multer from "multer";
import { ShoppingRoute } from "./ShoppingRoute";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const images = multer({ storage: imageStorage }).array("images", 10);
router.post("/login", VendorLogin);
router.use(Authentication);
router.get("/profile", GetVendorProfile);
router.patch("/porfile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);
router.post("/food", images, AddFood);
router.post("/coverImage", images, UpdateVendorCoverImage);

router.use(ShoppingRoute);

export { router as VendorRoute };
