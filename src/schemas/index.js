const _ = require("lodash");
const Joi = require("joi");
const adhan = require("adhan");

exports.getPrayerTimesRequestSchema = Joi.object().keys({
  query: Joi.object()
    .required()
    .keys({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
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
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }),
});
