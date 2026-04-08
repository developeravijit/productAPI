require("dotenv").config();
const express = require("express");
const DbConnect = require("./app/config/db");
const router = require("./app/routes/productRoutes");

const app = express();
DbConnect();

// Define JSON
app.use(express.json());

// Define Routes
app.use("/api", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
