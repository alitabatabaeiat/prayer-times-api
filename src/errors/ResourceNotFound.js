const AppBaseError = require("./BaseError");

class AppResourceNotFoundError extends AppBaseError {
  constructor(originalError, resourceName) {
    super(originalError, `'${resourceName}' not found`, 404);
    this.name = "AppResourceNotFoundError";
  }
}

module.exports = AppResourceNotFoundError;
