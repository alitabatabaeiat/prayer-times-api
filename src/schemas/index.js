const _ = require("lodash");
const Joi = require("joi");
const adhan = require("adhan");

exports.getPrayerTimesRequestSchema = Joi.object().keys({
  query: Joi.object()
    .required()
    .keys({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      calculationMethod: Joi.string()
        .valid(
          ..._.chain(adhan.CalculationMethod)
            .keys()
            .filter((m) => m !== "Other")
            .value()
        )
        .optional(),
    }),
});

exports.getQiblaRequestSchema = Joi.object().keys({
  query: Joi.object()
    .required()
    .keys({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
    }),
});

exports.getCoordinatesRequestSchema = Joi.object().keys({
  query: Joi.object().required().keys({
    address: Joi.string().required(),
  }),
});
