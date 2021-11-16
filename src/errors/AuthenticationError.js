const AppBaseError = require("./BaseError");

class AppAuthenticationError extends AppBaseError {
  constructor(originalError) {
    super(originalError, "Authentication failed", 401);
    this.name = "AppAuthenticationError";
  }
}

module.exports = AppAuthenticationError;
