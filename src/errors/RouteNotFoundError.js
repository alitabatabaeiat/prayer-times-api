const AppBaseError = require("./BaseError");

class AppRouteNotFoundError extends AppBaseError {
  constructor(path) {
    super(new Error(`'${path}' not found'`), `404 not found`, 404);
    this.name = "AppRouteNotFoundError";
  }
}

module.exports = AppRouteNotFoundError;
