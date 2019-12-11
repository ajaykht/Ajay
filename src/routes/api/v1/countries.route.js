const {Router} = require("express");
const {getCountries,
  getStatesByCountry,
} = require("../../../controllers/countries.ctrl");
const {
    validate
  } = require("../../../middlewares/countries.validator.mw");
  
const router = Router();

router.get("/", getCountries);
router.get("/:countryId/states",validate('getStatesByCountry'),getStatesByCountry);
module.exports = router;