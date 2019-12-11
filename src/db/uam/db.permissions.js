const db = require('../db.connection');
const Permission = require("../../models/uam/permissions");
const {
  logError
} = require("../../utils/logger.utils");

module.exports = {
  getAllPermissions: (permissionId,operationId,resourceId) => {
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_getAllPermission(?,?,?)`,[permissionId,operationId,resourceId], (error, results) => {
        if (error) {
          reject(error);
        }else if(results[0].length>0) {
          let permissions = mapPermissions(results[0]);
          resolve(permissions);
        }
      })
    });
  },
  addPermission: ({operation_id,resource_id,created_by,modified_by,urlId}) => {
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_addpermission(?,?,?,?,?,?)`,[operation_id,resource_id,1,created_by,modified_by,urlId], (error, results) => {
        if (error) {
          reject(error);
        }else if(results.affectedRows==1)resolve(true); else resolve(false);
      })
    });
  },
  checkPermissionAlreadyExist: (permission_dto) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT count(*) as count FROM rems.permissions where permissions.operation_id=? and permissions.resource_id=?`,[permission_dto.operation_id,permission_dto.resource_id], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  }
}
const mapPermissions = (results) => {
  const permissions = new Array();
  results
    .map(permission => {
      permissions.push(new Permission(permission.id, permission.operation_id, permission.resource_id,permission.active_status,permission.created_by,permission.modified_by,permission.Created_date,permission.modified_date,permission.op_name,permission.res_name,permission.url,permission.url_name,permission.url_description));
    });
  return permissions;
}