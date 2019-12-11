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
        case'createResource':
          {
            req.checkBody("name", ApiError.MISSING_NAME).notEmpty();
            req.checkBody("description", ApiError.MISSING_DESCRIPTION).notEmpty();
            req.checkBody("created_by", ApiError.MISSING_CREATED_BY).isNumeric();
            req.checkBody("modified_by", ApiError.MISSING_MODIFIED_BY).isNumeric();
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
        case'deleteResource':
        {
          req.checkParams("resourceId", ApiError.MISSING_RESOURCEID).isNumeric();
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
     }
    }
  }
}

