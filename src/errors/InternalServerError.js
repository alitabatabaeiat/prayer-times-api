const AppBaseError = require("./BaseError");

class AppInternalServerError extends AppBaseError {
  constructor(
    originalError,
    message = "Internal server error",
    statusCode = 500
  ) {
    super(originalError, message, statusCode);
    this.name = "AppInternalServerError";
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

module.exports = AppInternalServerError;
