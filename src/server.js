require("dotenv/config");
const express = require("express");
const jsend = require("jsend");
const AppRouteNotFoundError = require("./errors/RouteNotFound");
const errorHandler = require("./middlewares/error");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

app.use(jsend.middleware);

app.get("/", (req, res) => {
  res.send(
    "Hello World! This api is going to provide you with owghat. Stay tuned!"
  );
});

app.use((req, res, next) => next(new AppRouteNotFoundError()));

app.use(errorHandler);

const port = process.env.PORT || 5000;

let server;

sequelize.authenticate().then(() => {
  console.log(`${process.env.DB_DIALECT} connection established...`);

  server = app.listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
    );
  });
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`, err);

  if (server) {
    server.close(() => process.exit(1));
  }
});
