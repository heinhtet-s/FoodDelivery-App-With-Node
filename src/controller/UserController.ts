import { plainToClass } from "class-transformer";
import express, { Request, Response, NextFunction } from "express";

import { CreateCustomerInput, UserLoginInput } from "../dio/Customer.dto";

import {
  GenerateSalt,
  generateToken,
  HashPassword,
  ValidatePassword,
} from "../utility/passwordUnility";
import { validate } from "class-validator";
import { Customer } from "../models/Customer";
export const UserSignUp = async (
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

  const createCustomer = await Customer.create({
    email,
    password: hashPassword,
    salt: genSalt,
    phone,

    firstName: "",
    lastName: "",
    address: "",
    verified: false,

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

export const UserLogin = async (
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
