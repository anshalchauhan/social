// ---------------Express---------------
// Web Framework for Node.js
const express = require("express");

// Cross-origin resource sharing
// const cors = require("cors");

// ---------------Cookie-Parser---------------
// Parse HTTP request cookies
const cookieParser = require("cookie-parser");

// Error Handling
// AppError class
const AppError = require("./utils/appError");
// Global Error Handler
const globalErrorHandler = require("./controllers/errorController");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

// Middlewares
// app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// To parse JSON data in the req.body
app.use(express.json());
// To parse form data in the req.body, extended true means even nested object will get parsed
app.use(express.urlencoded({ extended: true }));
// To parse http request cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
