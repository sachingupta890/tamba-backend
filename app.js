import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "https://tamba-frontend.vercel.app/",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api",indexRoute)




export default app;
