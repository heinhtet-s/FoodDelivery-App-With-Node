import { plainToClass } from "class-transformer";
import express, { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dio";
import {
  CreateCustomerInput,
  EditCustomerProfileInput,
  UserLoginInput,
} from "../dio/Customer.dto";
import { Vendor } from "../models";
import {
  GenerateSalt,
  generateToken,
  HashPassword,
  ValidatePassword,
} from "../utility/passwordUnility";
import { validate } from "class-validator";
import { Customer } from "../models/Customer";
import { GenerateOtp, onRequestOTP } from "../utility/NotificationUtility";
export const CustomerSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInput = plainToClass(CreateCustomerInput, req.body);
  const inputErrors = await validate(customerInput, {
    validationError: { target: true },
  });
  if (inputErrors.length > 0) {
    return res.status(400).json({ message: inputErrors });
  }
  const { email, password, phone } = customerInput;
  const vendorExit = await Customer.find({ email });
  if (vendorExit.length > 0) {
    return res.status(400).json({ message: "Customer already exist" });
  }
  const genSalt = await GenerateSalt();
  const hashPassword = await HashPassword(password, genSalt);
  const { otp, expiry } = GenerateOtp();
  await onRequestOTP(otp, phone);
  const createCustomer = await Customer.create({
    email,
    password: hashPassword,
    salt: genSalt,
    phone,
    otp,
    otp_expiry: expiry,
    firstName: "",
    lastName: "",
    address: "",
    verified: false,
    lat: 0,
    lng: 0,
    orders: [],
  });
  if (createCustomer) {
    const signature = await generateToken({
      _id: createCustomer._id,
      email: createCustomer.email,
      verified: createCustomer.verified,
    });
    // Send the createCustomer
    return res.status(201).json({
      signature,
      verified: createCustomer.verified,
      email: createCustomer.email,
    });
  }
};

export const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(UserLoginInput, req.body);

  const validationError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }

  const { email, password } = customerInputs;
  const customer = await Customer.findOne({ email: email });
  if (customer) {
    const validation = await ValidatePassword(
      password,
      customer.password,
      customer.salt
    );

    if (validation) {
      const signature = generateToken({
        _id: customer._id,
        email: customer.email,
        verified: customer.verified,
      });

      return res.status(200).json({
        signature,
        email: customer.email,
        verified: customer.verified,
      });
    }
  }

  return res.json({ msg: "Error With Signup" });
};

export const CustomerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);
    if (profile) {
      if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
        profile.verified = true;

        const updatedCustomerResponse = await profile.save();

        const signature = generateToken({
          _id: updatedCustomerResponse._id,
          email: updatedCustomerResponse.email,
          verified: updatedCustomerResponse.verified,
        });

        return res.status(200).json({
          signature,
          email: updatedCustomerResponse.email,
          verified: updatedCustomerResponse.verified,
        });
      }
    }
  }

  return res.status(400).json({ msg: "Unable to verify Customer" });
};

export const RequestOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    if (profile) {
      const { otp, expiry } = GenerateOtp();
      profile.otp = otp;
      profile.otp_expiry = expiry;

      await profile.save();
      await onRequestOTP(otp, profile.phone);

      return res
        .status(200)
        .json({ message: "OTP sent to your registered Mobile Number!" });
    }
  }

  return res.status(400).json({ msg: "Error with Requesting OTP" });
};

export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    if (profile) {
      return res.status(201).json(profile);
    }
  }
  return res.status(400).json({ msg: "Error while Fetching Profile" });
};

export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  const customerInputs = plainToClass(EditCustomerProfileInput, req.body);

  const validationError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }

  const { firstName, lastName, address } = customerInputs;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.address = address;
      const result = await profile.save();

      return res.status(201).json(result);
    }
  }
  return res.status(400).json({ msg: "Error while Updating Profile" });
};
