const {
    logInfo,
    logError
  } = require("../utils/logger.utils");
  const {
    errorResponse,
    validationResponse,
    successResponse
  } = require("../utils/response.utils");
  const countryRepo = require("../db/db.countries");
  const AuthDto = require("../dto/auth.dto");
  const ApiError = require("../utils/error.utils");
  const Message = require("../utils/messages.utils");
  const HttpStatus = require("http-status-codes");
  
  module.exports = {
    getCountries:async (req, res, next)=>{
    try{
      let countries = await countryRepo.getCountries()
      return countries ?
        successResponse(res, HttpStatus.OK, {countries: countries}) :errorResponse(res, HttpStatus.NOT_FOUND, ApiError.COUNTRY_NOT_FOUND);
       }catch(error){
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
       }
  },
  getStatesByCountry:async (req, res, next)=>{
    var countriesId = req.params.countryId;
      let State = await countryRepo.getStatesByCountry(countriesId);
      if (State.length==0) 
      return successResponse(res, HttpStatus.OK, ApiError.BAD_REQUEST);
      try{
      return State ?
      successResponse(res, HttpStatus.OK, {States: State}):errorResponse(res, HttpStatus.OK, ApiError.STATE_NOT_FOUND);
       }catch(error){
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
       }
  }
}

