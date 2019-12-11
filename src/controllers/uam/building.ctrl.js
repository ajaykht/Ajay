const {
    logInfo
  } = require("../../utils/logger.utils");
  const HttpStatus = require("http-status-codes");
  const Message = require("../../utils/messages.utils");
  const BuildingDTO = require("../../dto/building.dto");
  const BuildingRepo = require("../../db/uam/db.building")
//   const {
//     successResponse,
//     errorResponse
//   } = require('../../utils/response.utils');
  const ApiError = require("../../utils/error.utils");
  
  module.exports = {
    createBuilding: async (req, res, next) => {
       
        let building_dto = parseCreateBuildingInputs(req);
        try{
        let status = await checkAlreadyBuilingCode(res, building_dto);
        if (status === false) {
        let result = await operationRepo.insertoperation(operation_dto)
        .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
        if (result.length != 1)
        return successResponse(res, HttpStatus.OK, Message.OPERATION_CREATED);}}
        catch(error){
     return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }
    }
  }
  const checkAlreadyBuilingCode = async (res, operation_dto) => {
    try{
   let status = await BuildingRepo.checkAlreadyBuilingCode(operation_dto)
   .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
   if (status === true) return validationResponse(res, HttpStatus.OK, ApiError.OPERATION_ALREADY_EXIST);
    return status;
    }
    catch(error){
     return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
      }
  }

  
  const parseCreateBuildingInputs = (req) => {
    return new BuildingDTO(
      req.body.building_code,
      req.body.name,
      req.body.location,
      req.body.no_of_floors,
      req.body.no_of_units,
      req.body.rent_close_date,
      req.body.management_fee,
      req.body.remark,
      req.body.status,
      req.body.address_id,
      req.body.created_by,
      req.body.created_date,
      req.body.modified_by,
      req.body.modified_date,
      req.body.street,
      req.body.cityid,
      req.body.country_id,
      req.body.address,
      req.body.zip,
      req.body.stateid
    );
  }