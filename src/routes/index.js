const { Router } = require("express");
const {
  getCalculationMethods,
  getPrayerTimes,
  getQibla,
} = require("../controllers");

const router = Router();

router.route("/calculation-methods").get(getCalculationMethods);
router.route("/prayer-times").get(getPrayerTimes);
router.route("/qibla").get(getQibla);

module.exports = router;
