import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dio";
import { Vendor } from "../models";
import { GenerateSalt, HashPassword } from "../utility/passwordUnility";
export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};
export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;
  const vendorExit = await findVendor("", email);
  const genSalt = await GenerateSalt();
  const hashPassword = await HashPassword(password, genSalt);
  if (vendorExit) {
    return res.status(400).json({ message: "Vendor already exist" });
  }
  const createVendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password: hashPassword,
    salt: genSalt,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foods: [],
  });
  return res.send(createVendor);
};
export const getVendors = (req: Request, res: Response, next: NextFunction) => {
  Vendor.find()
    .then((vendors) => {
      res.send(vendors);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
export const getVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const vendor = await findVendor(id);
  if (!vendor) {
    return res.status(400).json({ message: "Vendor not found" });
  }
  return res.send(vendor);
};
export const updateVendor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const deleteVendor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
