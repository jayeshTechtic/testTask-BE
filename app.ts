import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import propertyRoutes from "./routes/propertyRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.DB_URL || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//  routes
app.get("/api", () => console.log("hello"));
app.use("/api/properties", propertyRoutes);

export default app;
