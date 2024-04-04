import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import router from "./routes/routes";

// cloudinay

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
dotenv.config();

// middleware
app.set("trust proxy", 1);
app.use(helmet());
app.use(morgan("common"));
const allowedOrigins = ["http://localhost:3000", "https://shreads.vercel.app"];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(cookieParser());

// routes
app.use(router);
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3999;
const server = app.listen(PORT, () => {
  console.log(`Listenting on port no ${PORT}`);
});
process.on("SIGINT", async () => {
  console.log("Closing Prisma Client connection");
  await prisma.$disconnect();
  console.log("Prisma Client connection closed");
  server.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});
