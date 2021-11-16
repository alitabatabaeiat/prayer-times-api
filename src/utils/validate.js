const _ = require("lodash");
const ValidationError = require("../errors/ValidationError");

const validate = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = {};
    _.forEach(error.details, ({ path, type }) => {
      let property = errors;
      for (i = 0; i < path.length - 1; i++) {
        if (!property[path[i]]) {
          property[path[i]] = {};
        }
        property = property[path[i]];
      }
      property[path[i]] = type;
    });
    throw new ValidationError(error, errors);
  }

  return value;
};

module.exports = validate;
