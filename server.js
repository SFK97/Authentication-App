require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//Connect DB
connectDB();

const app = express();

app.use(express.json()); //middleware to allow us to get data from request.body

app.use("/api/auth", require("./routes/auth")); // when request comes in, middleware catches it and checks, then redirects to auth router
app.use("/api/private", require("./routes/private"));

//Error Handler (Last piece of middleware)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
