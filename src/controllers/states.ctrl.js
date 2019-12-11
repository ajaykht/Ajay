const {
    logInfo,
    logError
  } = require("../utils/logger.utils");
  const {
    errorResponse,
    validationResponse,
    successResponse
  } = require("../utils/response.utils");
  const statesRepo = require("../db/db.states");
  const AuthDto = require("../dto/auth.dto");
  const ApiError = require("../utils/error.utils");
  const Message = require("../utils/messages.utils");
  const HttpStatus = require("http-status-codes");
  
  module.exports = {
    getCitiesByState:async (req, res, next)=>{
    var stateId = req.params.stateId;
      let City = await statesRepo.getCitiesByState(stateId);
      if (City.length==0) 
      return successResponse(res, HttpStatus.OK, ApiError.BAD_REQUEST);
      try{
       return City ?
       successResponse(res, HttpStatus.OK, {Cities: City}):errorResponse(res, HttpStatus.OK, ApiError.CITY_NOT_FOUND);
       }catch(error){
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
       }
  }
}

