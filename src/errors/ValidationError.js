const AppBaseError = require("./BaseError");

class AppValidationError extends AppBaseError {
  constructor(originalError, errors) {
    super(originalError, "Validation error!", 400);
    this.name = "AppValidationError";
    this.errors = errors;
  }
}

module.exports = AppValidationError;
