const AppBaseError = require("./BaseError");

class AppDatabaseError extends AppBaseError {
  constructor(originalError) {
    super(originalError, "Internal server error", 500);
    this.name = "AppDatabaseError";
  }
}

module.exports = AppDatabaseError;
