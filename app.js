import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.js"
import cookieParser from "cookie-parser";
import logger from "./config/logger.js"
const app = express();

app.use(
  cors({
    origin: "https://tamba-frontend.vercel.app",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});


app.use("/api",indexRoute)




export default app;
