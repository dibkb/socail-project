import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
dotenv.config();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const prisma = new PrismaClient();

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
