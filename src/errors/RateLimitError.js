const AppBaseError = require("./BaseError");

class AppRateLimitError extends AppBaseError {
  constructor(message) {
    super(null, message, 429);
    this.name = "AppRateLimitError";
  }
}

module.exports = AppRateLimitError;
