const { Router } = require("express");
const {
  getCalculationMethods,
  getPrayerTimes,
  getQibla,
  getCoordinates,
} = require("../controllers");

const router = Router();

router.route("/calculation-methods").get(getCalculationMethods);
router.route("/prayer-times").get(getPrayerTimes);
router.route("/qibla").get(getQibla);

router.route("/coordinates").get(getCoordinates);

module.exports = router;
