// http module to create an http server
const http = require("http");

// ---------------Dotenv---------------
// Dotenv loads environment variables from a .env file into process.env.
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// ---------------Mongoose---------------
// Mongoose is an object modeling tool from MongoDB and Node.js
const mongoose = require("mongoose");

// Creating the DB String
const DB = process.env.MONGO_URI.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);

// Connecting to DB
mongoose.connect(DB).then(() => {
  console.log("DB Connection successful!");
});

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

// ---------------App Module---------------
// App module contains all the express logic
const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);

// Handling Unhanlded Rejections
process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
