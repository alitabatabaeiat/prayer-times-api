const _ = require("lodash");
const adhan = require("adhan");
const moment = require("moment");
const geoTz = require("geo-tz");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../utils/validate");
const {
  getPrayerTimesRequestSchema,
  getQiblaRequestSchema,
} = require("../schemas");

exports.getCalculationMethods = asyncHandler(async (req, res) => {
  const calculationMethods = _.chain(adhan.CalculationMethod)
    .keys()
    .filter((m) => m !== "Other")
    .value();

  res.status(200).jsend.success({ calculationMethods });
});

exports.getPrayerTimes = asyncHandler(async (req, res) => {
  const { query } = validate(getPrayerTimesRequestSchema, req);
  const date = new Date();
  const coordinates = new adhan.Coordinates(query.lat, query.lng);
  const params = query.calculationMethod
    ? adhan.CalculationMethod[query.calculationMethod]()
    : adhan.CalculationMethod.MuslimWorldLeague();

  const times = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

  prayerTimes = _.chain(prayerTimes)
    .pick(times)
    .mapValues((time) =>
      moment(time).tz(geoTz(query.lat, query.lng)[0]).format("HH:mmZ")
    )
    .value();

  res.status(200).jsend.success({ prayerTimes });
});

exports.getQibla = asyncHandler(async (req, res) => {
  const { query } = validate(getQiblaRequestSchema, req);
  const coordinates = new adhan.Coordinates(query.lat, query.lng);
  const qiblaDirection = adhan.Qibla(coordinates);

  res.status(200).jsend.success({ qiblaDirection });
});
