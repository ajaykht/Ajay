const {
  Router
} = require("express");

const {
  authenticateUser,
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../../../controllers/users.ctrl");

const {
  createAuthToken
} = require("../../../middlewares/users.auth.mw");

const {
  validate
} = require("../../../middlewares/users.validator.mw");

const router = Router();

router.post("/auth", validate('authenticateUser'), authenticateUser, createAuthToken);
router.post("/",validate('createUser'), registerUser);
router.get("/",validate('getAllUsers'), getAllUsers);
router.get("/:userId",validate('getUser'), getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;