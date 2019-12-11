const {Router} = require("express");
const {
    getCitiesByState
} = require("../../../controllers/states.ctrl");
const {
    validate
  } = require("../../../middlewares/countries.validator.mw");
  
const router = Router();
router.get("/:stateId/cities",validate('getCitiesByState'), getCitiesByState);
module.exports = router;