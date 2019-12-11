const {
  Router
} = require("express");

const {
  verifyAuthToken,
  authenticateToken
} = require("../../../middlewares/users.auth.mw");
const router = Router();

router.all("*", verifyAuthToken, authenticateToken);
router.use("/users", require("./users.route"));
router.use("/countries", require("./countries.route"));
router.use("/states", require("./states.route"));
router.use("/roles", require("./uam/roles.route"));
router.use("/permissions", require("./uam/permissions.route"));
router.use("/resources",require("./uam/resources.route"));
router.use("/building",require("./uam/building.route"));
router.use("/operations",require("./uam/operations.route"));
module.exports = router;