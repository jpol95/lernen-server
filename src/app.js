require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const validateBearerToken = require('./middleware/bearer-token')
const errorHandler = require('./middleware/error-handler')
const userRouter = require('./user/user-router')
const authRouter = require('./auth/auth-router')

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use(errorHandler)
app.use(validateBearerToken);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

module.exports = app;
