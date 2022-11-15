import express, { Request, Response, NextFunction } from "express";
import { Vendor } from "../models";
import { findVendor } from "./AdminController";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.body;
  const foodAvailability = await Vendor.find({
    pincode: pincode,
    serviceAvailable: true,
  })
    .sort({ rating: "descending" })
    .populate("foods");
  if (foodAvailability.length > 0) {
    return res.json(foodAvailability);
  }
  return res.status(400).json({ message: "No food available" });
};
export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.body;
  const foodAvailability = await Vendor.find({
    pincode: pincode,
    serviceAvailable: true,
  })
    .limit(10)
    .sort({ rating: "descending" })
    .populate("foods");
  if (foodAvailability.length > 0) {
    return res.json(foodAvailability);
  }
  return res.status(400).json({ message: "No food available" });
};
export const GetFoodsIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.body;
  const foodAvailability = await Vendor.find({
    pincode: pincode,
    serviceAvailable: true,
  });

  if (foodAvailability.length > 0) {
    var foodIn30Min: any = [];
    foodAvailability.map((vendor) => {
      foodIn30Min.push(
        ...vendor.foods.filter((food: any) => food.deliveryTime <= 30)
      );
    });
    return res.json(foodIn30Min);
  }
  return res.status(400).json({ message: "No food available" });
};
export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.body;
  const foodAvailability = await Vendor.find({
    pincode: pincode,
    serviceAvailable: true,
  });

  if (foodAvailability.length > 0) {
    var food: any = [];
    foodAvailability.map((vendor) => {
      food.push(...vendor.foods);
    });
    return res.json(food);
  }
};
export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const restaurant = await Vendor.findById(id).populate("foods");
  // restaurant = restaurant.populate("foods");
  if (restaurant) {
    return res.json(restaurant);
  }
  return res.status(400).json({ message: "No restaurant found" });
};
export const GetAvailableOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
