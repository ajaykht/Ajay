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
        case'getStatesByCountry':
          {
            req.checkParams("countryId", ApiError.INVALID_COUNTRYID).isNumeric();
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
          case'getCitiesByState':{
            req.checkParams("stateId", ApiError.STATEID_NOT_FOUND).isNumeric();
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
