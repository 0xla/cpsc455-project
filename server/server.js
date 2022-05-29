import router from "./router.js";
import express from "express"; // Express web server framework
import cors from "cors"; // Allows for Cross Origin Resource Sharing
import mongoose from "mongoose"; //Mongoose is a MongoDB library
import dotenv from "dotenv"; // .env for environment variables



const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/", router)

//Get uri from environment variables
const uri = process.env.ATLAS_URI;

//Start MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

 
app.listen(port, () => {
  // perform a database connection when server starts

  console.log(`Server is running on port: ${port}`);
});