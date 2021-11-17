const AppBaseError = require("./BaseError");

class AppRouteNotFoundError extends AppBaseError {
  constructor() {
    super(null, `404 not found`, 404);
    this.name = "AppRouteNotFoundError";
  }
}

module.exports = AppRouteNotFoundError;
