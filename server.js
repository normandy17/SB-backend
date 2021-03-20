const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const birdRoute = require("./Routes/birds");
let port=process.env.PORT || 8001

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/birds", birdRoute);


app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
