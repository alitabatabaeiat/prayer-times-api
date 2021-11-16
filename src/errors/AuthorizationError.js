const AppBaseError = require("./BaseError");

class AppAuthorizationError extends AppBaseError {
  constructor(originalError) {
    super(originalError, "Authorization failed", 403);
    this.name = "AppAuthorizationError";
  }
}

module.exports = AppAuthorizationError;
