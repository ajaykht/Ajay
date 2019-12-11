const db = require('../db.connection');
const Role = require("../../models/uam/role");
const Permissions=require("../../models/uam/permissions");
const {
  logError
} = require("../../utils/logger.utils");

module.exports = {
  getAllRoles: () => {
    return new Promise((resolve, reject) => {
      db.query("select id,name,description from roles", (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0)
          resolve(null);
        else {
          let roles = mapRoles(results);
          resolve(roles);
        }
      })
    });
  },
  checkRoleAlreadyExist: ({name}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT count(*) as count FROM roles where roles.name=?`,[name], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  checkRoleIdAlreadyExist: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT count(*) as count FROM roles where roles.id=?`,[id], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  checkRoleIdPermissionsIdsExist: (id,permissionId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT count(*) as count FROM roles_permissions where role_id=? and permission_id =?`,[id,permissionId], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  addRole:({id,name,description,created_by,modified_by})=>{
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_addrole(?,?,?,?)`,[name,description,created_by,modified_by], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows==1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  deleteRole:(id)=>{
    console.log(id);
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_deleterolebyid(?)`,[id], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows==1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  addPermissionsByRole:(roleId,permissionId)=>{
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_addpermissionroleby(?,?)`,[roleId,permissionId], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows==1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  getPermissionsByRole: (roleId) => {
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_getpermissonroleby(?)",[roleId], (error, results) => {
        if (error) {
          reject(error);
        } else if (results[0].length === 0)
          resolve(false);
        else {
          let Permissions_role = mapPermissionsRole(results[0]);
          resolve(Permissions_role);
        }
      })
    });
  },
  deletePermissionByRole:(id)=>{
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_deleterolebyid(?)`,[id], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows==1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  deletePermissionsByRoleId:(id,permissionIds)=>{
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_deletepermissionroleby(?,?)`,[id,permissionIds], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows==1)
          resolve(true);
        else
          resolve(false);
      })
    });
  }
}

const mapRoles = (results) => {
  const roles = new Array();
  results
    .map(role => {
      description = roles.description ? role.description : '';
      roles.push(new Role(role.id, role.name, description));
    });
  return roles;
}

const mapPermissionsRole = (results) => {
  const permissions = new Array();
  results
    .map(permission => {permissions.push(new Permissions(permission.permission_id,permission.operation_id,permission.resource_id,permission.active_status,permission.created_by,permission.modified_by,permission.created_date,permission.modified_date,permission.op_name,permission.rs_name,permission.url,permission.url_name,permission.url_description));
    });
  return permissions;
}