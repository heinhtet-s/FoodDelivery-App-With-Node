import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import { VendorRoute, AdminRoute, CustomerRoute } from "../routes";
export default async (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("This is the rejected field ->", error.field);
  });
  app.use("/vendor", VendorRoute);
  app.use("/admin", AdminRoute);
  app.use("/customer", CustomerRoute);
};
