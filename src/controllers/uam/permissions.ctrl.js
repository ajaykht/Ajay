const {
    logInfo
  } = require("../../utils/logger.utils");
  const HttpStatus = require("http-status-codes");
  const Message = require("../../utils/messages.utils");
  const PermissionDTO = require("../../dto/permission.dto");
  const permissionsRepo = require("../../db/uam/db.permissions")
  const {
    successResponse,
    errorResponse
  } = require('../../utils/response.utils');
  const ApiError = require("../../utils/error.utils")

  module.exports = {
    getAllPermissions:async (req, res, next) => {
      // get all permission
      try {
        const permissions = await permissionsRepo.getAllPermissions('','','')

        if (permissions.length === 0)
            return successResponse(res, HttpStatus.OK, ApiError.PERMISSIONS_NOT_FOUND);     

        return permissions ?
          successResponse(res, HttpStatus.OK, {"permissions":permissions}) :
          errorResponse(res, HttpStatus.NOT_FOUND, ApiError.PERMISSIONS_NOT_FOUND);
      } catch (error) {
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
      }
    },
    getPermissionbById:async (req, res, next) => {
      // 1. get permission by permissionId. 2. get all operations at specific resourceId 3. get all resources at specific operationId 
      try {
        var permissionId = req.params.permissionId;
        var operationId = req.params.operationId;
        var resourceId = req.params.resourceId;

        permissionId = (permissionId && (permissionId > 0)) ? permissionId : "";
        operationId = (operationId && (operationId > 0)) ? operationId : "";
        resourceId = (resourceId && (resourceId > 0)) ? resourceId : "";

        if(permissionId=="" && operationId=="" && resourceId=="")
            return successResponse(res, HttpStatus.OK, ApiError.REQUIRED_IDS);

        const permissions = await permissionsRepo.getAllPermissions(permissionId,operationId,resourceId)

        if (permissions.length === 0)
            return successResponse(res, HttpStatus.OK, ApiError.PERMISSION_NOT_FOUND);     

        return permissions ?
          successResponse(res, HttpStatus.OK, permissions) :
          errorResponse(res, HttpStatus.NOT_FOUND, ApiError.PERMISSION_NOT_FOUND);
      } catch (error) {
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
      }
    },
    deletePermissionById:(req,res,next)=>{
      res.send("permission delete successfully.");
    },
    addPermission:async(req,res,next)=>{
      //check exist or not permission into permission table.Then add otherwise give message already exist your entered permission and check operation id and resource id exist or not .
      try{
        let permission_dto=parsePermissionInputs(req);
        let status=await checkPermissionAlreadyExist(res,permission_dto)

        if (status === true)
           return successResponse(res, HttpStatus.OK, ApiError.PERMISSION_AlREADY_EXIST);

        if(status===false)
        {
          let result=await permissionsRepo.addPermission(permission_dto)            
          if(result)
             return successResponse(res, HttpStatus.OK, Message.PERMISSION_CREATED); 
        }
      }catch(error){
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
      }   
    },
    deleteRole_Permission:(req,res,next)=>{
      res.send("role and permission delete successfully.");
    },
    addRole_Permission:(req,res,next)=>{
      //check exist or not permission into role_permission table on specified role.Then add otherwise give message already exist your entered permission.
        res.send("role and permission add successfully.");
    },
    getPermissionsRoleBy: (req, res, next) => {
      res.send("permission list.");
    },
  }
  
  const checkPermissionAlreadyExist= async (res,permission_dto) => {
    // check permission exists or not
    try{
     let status = await permissionsRepo.checkPermissionAlreadyExist(permission_dto)
     return status;
    }catch(error){
     return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }  
   }
  
const parsePermissionInputs = (req) => {
  return new PermissionDTO(
    req.body.operation_id,
    req.body.resource_id,
    req.body.active_status,
    req.body.created_by,
    req.body.modified_by,
    req.body.url_id
  );
};