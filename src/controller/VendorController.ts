import express, { Request, Response, NextFunction } from "express";
import { CreateFoodInput, EditVendorInput, VendorLoginInput } from "../dio";
import { Food } from "../models/Food";
import { generateToken, ValidatePassword } from "../utility/passwordUnility";
import { findVendor } from "./AdminController";
export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await findVendor("", email);
  if (!user) {
    return res.status(400).json({ message: "User  not found" });
  }
  console.log("usr", user);
  const validatePassword = await ValidatePassword(
    password,
    user.password,
    user.salt
  );
  if (!validatePassword) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = generateToken({
    _id: user.id,
    email: user.email,
    name: user.name,
  });
  return res.send(token);
};
export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendor = await findVendor(req.user._id);
  console.log("ef", vendor);
  if (!vendor) {
    return res.status(400).json({ message: "Vendor not found" });
  }
  return res.send(vendor);
};
export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foodType, name, address, phone } = <EditVendorInput>req.body;
  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    vendor.foodType = foodType;
    vendor.name = name;
    vendor.address = address;
    vendor.phone = phone;
    const saveResult = await vendor.save();
    return res.json(saveResult);
  }
  return res.status(400).json({ message: "Vendor not found" });
};
export const UpdateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => file.filename);
    const vendor = await findVendor(user._id);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    vendor.coverImages.push(...images);
    const saveResult = await vendor.save();
    return res.json(saveResult);
  }
  return res.status(400).json({ message: "Vendor not found" });
};
export const UpdateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    vendor.serviceAvailable = !vendor.serviceAvailable;
    const saveResult = await vendor.save();
    return res.json(saveResult);
  }
  return res.status(400).json({ message: "Vendor not found" });
};

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, category, foodType, readyTime, price } = <
    CreateFoodInput
  >req.body;

  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => file.filename);
    const food = await Food.create({
      vendorId: vendor._id,
      name,
      description,
      category,
      foodType,
      readyTime,
      price,
      images: images,
      rating: 0,
    });
    vendor.foods.push(food);
    const result = await vendor.save();
    return res.json(result);
  }
};
export const GetFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const food = await Food.find({ vendorId: user._id });
    return res.json(food);
  }
  return res.status(400).json({ message: "Vendor not found" });
};
