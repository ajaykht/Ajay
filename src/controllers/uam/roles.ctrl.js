const {
  logInfo
} = require("../../utils/logger.utils");
const HttpStatus = require("http-status-codes");
const Message = require("../../utils/messages.utils");
const RoleDTO = require("../../dto/roles.dto");
const rolesRepo = require("../../db/uam/db.roles")
const {
  successResponse,
  errorResponse
} = require('../../utils/response.utils');
const ApiError = require("../../utils/error.utils");

module.exports = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await rolesRepo.getAllRoles()
      return roles ?
        successResponse(res, HttpStatus.OK, {"roles":roles}) :
        errorResponse(res, HttpStatus.NOT_FOUND, ApiError.ROLES_NOT_FOUND);
    } catch (error) {
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }
  },
  addRole:async(req,res,next)=>{
    //check exist or not permission into permission table.Then add otherwise give message already exist your entered permission and check operation id and resource id exist or not .
    try{
      let role_dto=parseRoleInputs(req);
      let status=await checkRoleAlreadyExist(res,role_dto)

      if (status === true)
         return successResponse(res, HttpStatus.OK, ApiError.ROLE_AlREADY_EXIST);

      if(status===false)
      {
          let result=await rolesRepo.addRole(role_dto);
          if(result)
              return successResponse(res, HttpStatus.OK, Message.Role_CREATED); 
      }
    }catch(error){
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }   
  },
  getPermissionsByRoleId:async(req,res,next)=>{
   try{
    var roleId = req.params.id;
    let result=await rolesRepo.getPermissionsByRole(roleId);

    if(result===false)
       return successResponse(res, HttpStatus.OK, ApiError.PERMISSIONS_NOT_FOUND);

       return result ?
       successResponse(res, HttpStatus.OK, {"permissions":result}) :
       errorResponse(res, HttpStatus.NOT_FOUND, ApiError.PERMISSIONS_NOT_FOUND);
   }catch(error){
    return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
   }
  },
  deleteRole:async(req,res,next)=>{
   try{
    var roleId = req.params.id;
    let status=await rolesRepo.checkRoleIdAlreadyExist(roleId);
    
    if(status===false)
        return successResponse(res, HttpStatus.OK, ApiError.ROLEID_NOT_FOUND);

    if(status===true){
      let result=await rolesRepo.deleteRole(roleId);

      if(result===true)
        return successResponse(res, HttpStatus.OK, Message.ROLE_DELETED);
    }
   }catch(error){return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);}
  
  },
  addOrdeletePermissionsToRole:async (req,res,next)=>{
    try{
      var action = req.query.action;
      var roleId=req.params.id;
      var permissionIds=Array.from(req.body.permissionIds, x =>x);

      let IsExistPermission=await checkRoleIdPermissionsIdsExist(roleId,permissionIds);
      // add role and permission into role_permission table
      if(action==="ar"){
        let result=false;
        //return if enterd permissions ids exists
        if(Array.from(IsExistPermission, x =>x).length>0)
        return successResponse(res, HttpStatus.OK,`Permission id ${Array.from(IsExistPermission, x =>x).join(",")}  already exist`);
       
        for(let i=0; i < permissionIds.length;i++){
          result=await rolesRepo.addPermissionsByRole(roleId,permissionIds[i]);
        }
        if(result===true)
             return successResponse(res, HttpStatus.OK, Message.PERMISSIONS_CREATED);
      }
      // delete role and permission from role_permission table
      if(action==="dr"){
        let result=false;
        if(Array.from(IsExistPermission, x =>x).length==0)
          return successResponse(res, HttpStatus.OK,ApiError.PERMISSIONS_NOT_FOUND);
       
        for(let i=0; i < permissionIds.length;i++){
          result=await rolesRepo.deletePermissionsByRoleId(roleId,permissionIds[i]);
        }
        if(result===true)
        return successResponse(res, HttpStatus.OK, Message.PERMISSIONS_DELETED);          
      }
    }catch(error){return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);}    
  }
}
const checkRoleAlreadyExist= async (res,role_dto) => {
  // check role exists or not
  try{
   let status = await rolesRepo.checkRoleAlreadyExist(role_dto)
   return status;
  }catch(error){
   return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
  }  
 }
 const checkRoleIdPermissionsIdsExist= async (roleId,permissionIds) => {
  // check role exists or not
  let ArrayItem=new Array();
  try{
    for(let i=0; i < permissionIds.length;i++){
      result = await rolesRepo.checkRoleIdPermissionsIdsExist(roleId,permissionIds[i]);
      if(result===true){
        ArrayItem.push(permissionIds[i]);
      }
     }
   return ArrayItem;
  }catch(error){
   return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
  }  
 }

 const parseRoleInputs = (req) => {
  return new RoleDTO(
    req.body.name,
    req.body.description,
    req.body.created_by,
    req.body.modified_by
  );
 };
