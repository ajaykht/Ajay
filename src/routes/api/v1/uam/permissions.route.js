const {
    Router
  } = require('express');
  const {
    getAllPermissions,addPermission,deletePermissionById,getPermissionbById,deleteRole_Permission,addRole_Permission,getPermissionsRoleBy
  } = require('../../../../controllers/uam/permissions.ctrl');
  const {
    validate
  } = require("../../../../middlewares/permissions.validator.mw");

  const router = Router();
  
  router.get("/", getAllPermissions);
  router.get("/:permissionId/:operationId/:resourceId",validate('getPermissionByIds'),getPermissionbById)
  router.post("/",validate('createPermission'), addPermission);
  router.delete("/:id", deletePermissionById);
  module.exports = router;