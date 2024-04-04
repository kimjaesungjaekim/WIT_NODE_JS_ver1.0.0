import express from "express";
import routes from "./app/routes/routes.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config.js"

const app = express();

/**
 * App Configuration
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan("combined")); // morgan 사용하기

app.get("/", (req, res) => {
  res.json({ status: "API is running on /api" });
});

/* eslint-disable */
app.use((err, req, res, next) => {
  if (err && err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: "error",
      message: "missing authorization credentials",
    });
  } else if (err && err.errorCode) {
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

/**
 * Server activation
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
