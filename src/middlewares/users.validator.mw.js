const apiErrors = require("../utils/error.utils");
const ApiError = require("../utils/error.utils");
const jsend = require("jsend");
const {
  errorResponse,
  validationResponse,
  successResponse
} = require("../utils/response.utils");
const HttpStatus = require("http-status-codes");

module.exports = {

  validate: (method) => {
    return (req, res, next) => {
      switch (method) {
        case 'authenticateUser':
          {            
            req.checkBody("email", ApiError.MISSING_EMAIL_ID).notEmpty();
            req.checkBody("password", ApiError.MISSING_PASSWORD).isNumeric();
            console.log(req)
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
          break;
        case 'getUser':
          {
            req.checkParams("userId", ApiError.USER_NOT_EXIST).isNumeric();
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
          break;
        case 'getAllUsers':
          {
            req.checkBody('user_filter.active_status', ApiError.MISSING_ACTIVE_STATUS).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.userId', ApiError.USER_NOT_EXIST).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.username', ApiError.MISSING_USERNAME).matches(/^[a-zA-Z\s]*$/);
            req.checkBody('user_filter.roleId', ApiError.MISSING_ROLEID).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.cityId', ApiError.MISSING_CITYID).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.pagination.page_no', ApiError.MISSING_PAGENUMBER).matches(/^[0-9]*$/);  
            req.checkBody('user_filter.pagination.total', ApiError.MISSING_TOTALPAGENUMBER).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.pagination.pages', ApiError.MISSING_PAGES).matches(/^[0-9\s]*$/);
            req.checkBody('user_filter.pagination.orderby', ApiError.MISSING_ORDERBY).matches(/^[a-zA-Z\s_]*$/);
            req.checkBody('user_filter.pagination.sorting_by_asc', ApiError.MISSING_SORTING_BY_ASC).matches(/^[a-zA-Z\s]*$/);
            req.checkBody('user_filter.pagination.page_size', ApiError.MISSING_PAGE_SIZE).matches(/^[0-9\s]*$/);
            
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
          break;
      }
    }
  }
}
