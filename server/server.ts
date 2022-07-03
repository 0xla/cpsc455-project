import router from "./router";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';


const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/", router);

const uri = process.env.ATLAS_URI;

// @ts-ignore
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
