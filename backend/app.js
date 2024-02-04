// ---------------Express---------------
// Web Framework for Node.js
const express = require("express");

// ---------------Cookie-Parser---------------
// Parse HTTP request cookies
const cookieParser = require("cookie-parser");

// Routes
const userRouter = require("./routes/userRoutes");

const app = express();

// To parse JSON data in the req.body
app.use(express.json());
// To parse form data in the req.body, extended true means even nested object will get parsed
app.use(express.urlencoded({ extended: true }));
// To parse http request cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);

module.exports = app;
