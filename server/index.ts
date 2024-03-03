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

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.post.create({
    data: {
      title: "First",
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
app.get("/", (req: Request, res: Response) => {
  return res.json("Hello");
});
const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Listenting on port no ${PORT}`);
});
