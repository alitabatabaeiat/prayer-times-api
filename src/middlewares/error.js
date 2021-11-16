const _ = require("lodash");
const AppBaseError = require("../errors/BaseError");
const AppInternalServerError = require("../errors/InternalServerError");
const AppDatabaseError = require("../errors/DatabaseError");
const AppValidationError = require("../errors/ValidationError");
const AppRouteNotFoundError = require("../errors/RouteNotFound");

const errorHandler = (err, req, res, next) => {
  let error;

  if (err instanceof AppBaseError) {
    error = err;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    const errors = {};
    _.forOwn(err.fields, (v, field) => {
      errors[field] = `any.unique`;
    });
    error = new AppValidationError(err, errors);
  } else if (err.name.startsWith("Sequelize")) {
    // Important Alert!!!
    error = new AppDatabaseError(err);

    console.error(_.pick(error.originalError, ["name", "message", "sql"]));
  } else {
    error = new AppInternalServerError(err);
  }

  res.status(error.statusCode);
  if (error instanceof AppValidationError) {
    res.jsend.fail(error.errors);
  } else if (error instanceof AppRouteNotFoundError) {
    res.jsend.fail(error.message);
  } else {
    res.jsend.error(error.message);
  }
};

module.exports = errorHandler;
