const apiErrors = require("../utils/error.utils");
const ApiError = require("../utils/error.utils");
const jsend = require("jsend");
const {errorResponse,
   validationResponse,
   successResponse} = require("../utils/response.utils");
const HttpStatus = require("http-status-codes");

module.exports = {
    validate: (method) => {
        return (req, res, next) => {    
          switch (method) {
              case'createPermissionsToRole':
              {
                req.checkParams("id", ApiError.MISSING_ROLEID).isNumeric();
                req.checkBody("permissionIds", ApiError.INVALID_PERMISSIONID).notEmpty();
                req.checkQuery("action", ApiError.MISSING_ACTION).notEmpty();
                req.checkBody("permissionIds", ApiError.PERMISSIONIDS_ARRAY).isArray();
                
                var errors = req.validationErrors();
                if (errors) {  
                  var validationResult = { errors: []};
                  errors.forEach(function (err) {
                  validationResult.errors.push(err.msg);
                  });
                }
                if (errors)
                  return validationResponse(res, HttpStatus.OK, validationResult);
                else
                  next();
              }
              break;
              case'RoleId':
              {
                req.checkParams("id", ApiError.MISSING_ROLEID).isNumeric();
                var errors = req.validationErrors();
                if (errors) {  
                  var validationResult = { errors: []};
                  errors.forEach(function (err) {
                  validationResult.errors.push(err.msg);
                  });
                }
                if (errors)
                  return validationResponse(res, HttpStatus.OK, validationResult);
                else
                  next();
              }
              break;
              case'PermissionIdsIsInt':
              {
                var permissionIds=req.body.permissionIds;
                var IsValidPermissionIds=true;
                permissionIds.forEach(function(element) {
                  console.log(isNaN(element));
                   if(isNaN(element)===true)
                       IsValidPermissionIds=false;
                });
                // if permission Ids is not numeric then return error.
                if(IsValidPermissionIds===false)
                    return validationResponse(res, HttpStatus.OK, ApiError.INVALID_PERMISSIONID);
                else
                    next();
              }
              break;
              case 'createRole':{
                  req.checkBody("name", ApiError.MISSING_ROLENAME).notEmpty();
                  req.checkBody("created_by", ApiError.MISSING_CREATED_BY).isNumeric();
                  req.checkBody("modified_by", ApiError.MISSING_MODIFIED_BY).isNumeric();
                  var errors = req.validationErrors();

                  if (errors) {
                    var validationResult = {
                    errors: []
                  };
                  errors.forEach(function (err) {
                   validationResult.errors.push(err.msg);
                  });
                }

                if (errors)
                  return validationResponse(res, HttpStatus.OK, validationResult);
                else
                  next();
              }
            }
        }
      }
}