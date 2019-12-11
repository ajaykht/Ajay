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
              case'getPermissionByIds':
              {
                req.checkParams("permissionId", ApiError.INVALID_PERMISSIONID).isNumeric();
                req.checkParams("operationId", ApiError.INVALID_OPERATIONID).isNumeric();
                req.checkParams("resourceId", ApiError.INVALID_RESOURCEID).isNumeric();
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
              case 'createPermission':{
                  req.checkBody("operation_id", ApiError.INVALID_OPERATIONID).isNumeric();
                  req.checkBody("resource_id", ApiError.INVALID_RESOURCEID).isNumeric();
                  req.checkBody("created_by", ApiError.MISSING_CREATED_BY).isNumeric();
                  req.checkBody("modified_by", ApiError.MISSING_MODIFIED_BY).isNumeric();
                  req.checkBody("url_id", ApiError.INVALID_URLID).isNumeric();
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