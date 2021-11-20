module.exports = () => (req, res, next) => {
  req.originalUrl = (req.headers["x-forwarded-prefix"] || "") + req.url;
  next();
};
