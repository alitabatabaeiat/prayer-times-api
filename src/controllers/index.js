const _ = require("lodash");
const adhan = require("adhan");
const moment = require("moment");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../utils/validate");
const { getForwardGeocoding } = require("../utils/positionStack");
const {
  getPrayerTimesRequestSchema,
  getQiblaRequestSchema,
  getCoordinatesRequestSchema,
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

  const date = moment(query.date);
  const coordinates = new adhan.Coordinates(query.latitude, query.longitude);
  const calculationMethod = query.calculationMethod || "MuslimWorldLeague";
  const params = adhan.CalculationMethod[calculationMethod]();

  const times = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  let prayerTimes = new adhan.PrayerTimes(coordinates, date.toDate(), params);

  prayerTimes = _.chain(prayerTimes)
    .pick(times)
    .mapValues((time) => moment(time).format("HH:mmZ"))
    .value();

  res.status(200).jsend.success({
    date: date.format("YYYY-MM-DD"),
    calculationMethod,
    prayerTimes,
  });
});

exports.getQibla = asyncHandler(async (req, res) => {
  const { query } = validate(getQiblaRequestSchema, req);
  const coordinates = new adhan.Coordinates(query.latitude, query.longitude);
  let qiblaDirection = adhan.Qibla(coordinates).toFixed(2);
  qiblaDirection = parseFloat(qiblaDirection);

  res.status(200).jsend.success({ qiblaDirection });
});

exports.getCoordinates = asyncHandler(async (req, res) => {
  const { query } = validate(getCoordinatesRequestSchema, req);
  let coordinates = await getForwardGeocoding(query.address);
  coordinates = _.map(coordinates, (coordinate) =>
    _.chain(coordinate)
      .pick([
        "latitude",
        "longitude",
        "region",
        "region_code",
        "locality",
        "country",
        "country_code",
        "label",
      ])
      .mapKeys((value, key) => _.camelCase(key))
      .value()
  );

  res.status(200).jsend.success({ coordinates });
});
