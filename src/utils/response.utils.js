const {
  logError
} = require("./logger.utils");
const jsend = require("jsend");

module.exports = {
  errorResponse: (res, httpStatus, apiError, error = "") => {
    error === "" ? logError(apiError) : logError(error);
    return res
      .status(httpStatus)
      .send(jsend.error(apiError));
  },

  validationResponse: (res, httpStatus, validationError) => {
    //logError(validationError)
    return res
      .status(httpStatus)
      .send(jsend.fail(validationError));
  },

  successResponse: (res, httpStatus, message) => {
    return res
      .status(httpStatus)
      .send(jsend.success(message));
  }
}