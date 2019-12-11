const {
  Router
} = require('express');
const {
  getAllRoles,addRole,deleteRole,getPermissionsByRoleId,addOrdeletePermissionsToRole
} = require('../../../../controllers/uam/roles.ctrl');
const {
  validate
} = require("../../../../middlewares/roles.validator.mw");

const router = Router();

router.get("/", getAllRoles);
router.post("/",validate('createRole'), addRole);
router.delete("/:id",validate('RoleId'),deleteRole);
router.get("/:id/permissions",validate('RoleId'),getPermissionsByRoleId);
router.post("/:id",validate('createPermissionsToRole'),validate('PermissionIdsIsInt'),addOrdeletePermissionsToRole);
module.exports = router;