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

app.get("/", (req: Request, res: Response) => {
  return res.json("Hello");
});
const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Listenting on port no ${PORT}`);
});
