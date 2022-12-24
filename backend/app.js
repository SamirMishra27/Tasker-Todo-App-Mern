require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/database");
const todoRoutes = require("./controllers/todoControllers");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/", todoRoutes);

console.log(app);

connectDatabase();
app.listen(process.env.PORT || 3000, () => {
    console.log("API is successfully running at Port " + process.env.PORT);
});