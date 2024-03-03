import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();
dotenv.config();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  return res.json("Hello");
});
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
