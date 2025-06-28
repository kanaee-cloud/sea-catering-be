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
 origin: [
    "http://localhost:5173", 
    "https://sea-catering-fe.vercel.app" // error mulu jadi coba gini aja cors nya
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/", v1Route);
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export default app;