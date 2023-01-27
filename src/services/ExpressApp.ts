import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import { UserRoute } from "../routes";
export default async (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.send("Received a GET HTTP method");
  });
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("This is the rejected field ->", error.field);
  });
  app.use("/customer", UserRoute);
};
