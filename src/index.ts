import express, { Express } from "express";
import dotenv from "dotenv";
import v1Route from "./routes/v1.route"
import cookieParser from "cookie-parser";
import {errorHandler} from "./exceptions/error_handler.exception";


dotenv.config();

const app: Express = express();
const cors = require("cors")
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/", v1Route);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;