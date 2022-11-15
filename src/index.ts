import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./config";
import App from "./services/ExpressApp";

const StartServer = async () => {
  dotenv.config();
  const app = express();
  await connectDB();
  await App(app);
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 3000");
  });
};
StartServer();
