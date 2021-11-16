const _ = require("lodash");
const adhan = require("adhan");
const moment = require("moment");
const geoTz = require("geo-tz");
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
  const date = new Date();
  const coordinates = new adhan.Coordinates(query.latitude, query.longitude);
  const params = query.calculationMethod
    ? adhan.CalculationMethod[query.calculationMethod]()
    : adhan.CalculationMethod.MuslimWorldLeague();

  const times = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  let prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

  prayerTimes = _.chain(prayerTimes)
    .pick(times)
    .mapValues((time) =>
      moment(time)
        .tz(geoTz(query.latitude, query.longitude)[0])
        .format("HH:mmZ")
    )
    .value();

  res.status(200).jsend.success({ prayerTimes });
});

exports.getQibla = asyncHandler(async (req, res) => {
  const { query } = validate(getQiblaRequestSchema, req);
  const coordinates = new adhan.Coordinates(query.latitude, query.longitude);
  const qiblaDirection = adhan.Qibla(coordinates);

  res.status(200).jsend.success({ qiblaDirection });
});

exports.getCoordinates = asyncHandler(async (req, res) => {
  const { query } = validate(getCoordinatesRequestSchema, req);
  let coordinates = await getForwardGeocoding(query.address);
  coordinates = _.map(coordinates, (coordinate) =>
    _.pick(coordinate, [
      "latitude",
      "longitude",
      "region",
      "region_code",
      "locality",
      "country",
      "country_code",
      "label",
    ])
  );

  res.status(200).jsend.success({ coordinates });
});
