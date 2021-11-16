class AppBaseError extends Error {
  constructor(originalError, message, statusCode) {
    super(message);
    this.name = "AppBaseError";
    this.statusCode = statusCode;
    this.originalError = originalError;

    if (this.originalError) {
      console.error(this.originalError.stack);
    } else {
      console.error(this.stack);
    }
  }
}

module.exports = AppBaseError;
