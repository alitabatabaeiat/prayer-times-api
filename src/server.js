require("dotenv/config");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const jsend = require("jsend");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");
const routes = require("./routes");
const AppRouteNotFoundError = require("./errors/RouteNotFoundError");
const errorMiddleware = require("./middlewares/error");
const forwardPrefixMiddleware = require("./middlewares/forwardPrefix");
const AppRateLimitError = require("./errors/RateLimitError");
const swaggerOptions = require("./configs/swagger");
// const { sequelize } = require("./models");

const app = express();

app.use(forwardPrefixMiddleware());

app.use(express.json());

app.use(jsend.middleware);

app.use(helmet());

app.use(xss());

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    skipFailedRequests: true,
    handler: (req, res, next, options) => {
      throw new AppRateLimitError(options.message);
    },
  })
);

app.use(hpp());

app.use(cors());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs, swaggerOptions));

app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.send(
    "Hello World! This api is going to provide you with owghat. Stay tuned!"
  );
});

app.use((req, res, next) => next(new AppRouteNotFoundError(req.path)));

app.use(errorMiddleware());

const port = process.env.PORT || 5000;

let server;
server = app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});

// sequelize.authenticate().then(() => {
//   console.log(`${process.env.DB_DIALECT} connection established...`);

//   server = app.listen(port, () => {
//     console.log(
//       `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
//     );
//   });
// });

process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`, err);

  if (server) {
    server.close(() => process.exit(1));
  }
});
