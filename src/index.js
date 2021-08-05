//Define .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import router from "./routes";
import debugMiddleware from "./middlewares/debugMiddleware";

import connectDB from "./stuff/db/connect";

const PORT = process.env.PORT || 1338;

//Configuring the application
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan("dev"));

// Add routes to application
app.use("/", debugMiddleware, router);

//Public files
app.use('/static', express.static('public'));

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      connectDB();
    });
  } catch (e) {
    console.log(e);
  }
};

start();
