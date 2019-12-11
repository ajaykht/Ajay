const {
  logInfo
} = require("../../utils/logger.utils");
const HttpStatus = require("http-status-codes");
const Message = require("../../utils/messages.utils");
const operationRepo = require("../../db/uam/db.operations")
const {
  validationResponse,
  successResponse,
  errorResponse
} = require('../../utils/response.utils');
const ApiError = require("../../utils/error.utils");
const OperationDTO = require("../../dto/operations.dto");

module.exports = {
  getAllOperations: async (req, res, next) => {
  try{
  let operations = await operationRepo.getAllOperations();
  if (operations.length === 0)
  return successResponse(res, HttpStatus.OK, ApiError.OPERATION_NOT_FOUND); 
  return operations ?
    successResponse(res, HttpStatus.OK, {operations: operations}) :errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.OPERATION_NOT_FOUND);
   }catch(error){
    return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
   }
  },
  createOperation: async (req, res, next) => {
    let operation_dto = parseCreateOperationInputs(req);
    try{
    let status = await checkAlreadyExistOperation(res, operation_dto);
    if (status === false) {
    let result = await operationRepo.insertoperation(operation_dto)
    .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
    if (result.length != 1)
    return successResponse(res, HttpStatus.OK, Message.OPERATION_CREATED);}}
    catch(error){
 return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
}
},

deleteOperation: async (req, res, next) => {
  try{
    var operationId = req.params.id;
    const status = await operationRepo.deleteOperation(operationId)
    .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
    if(status==true)  return successResponse(res, HttpStatus.CREATED, Message.OPERATION_DELETED);
    else return validationResponse(res, HttpStatus.OK, ApiError.OPERATIONID_NOT_EXIST);
  } catch(error){
  return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);}
   },

   getFeatures: async (req, res, next) => {
    try{
    let fetaures = await operationRepo.getOperationUrl();
    if (fetaures.length === 0)
    return successResponse(res, HttpStatus.OK, ApiError.FEATURES_NOT_FOUND); 
    return fetaures ?
      successResponse(res, HttpStatus.OK, {fetaures_urls: fetaures}) :errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.FEATURES_NOT_FOUND);
     }catch(error){
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
     }
    }
}

const checkAlreadyExistOperation = async (res, operation_dto) => {
  try{
 let status = await operationRepo.checkAlreadyExistOperation(operation_dto)
 .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
 if (status === true) return validationResponse(res, HttpStatus.OK, ApiError.OPERATION_ALREADY_EXIST);
  return status;
  }
  catch(error){
   return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }
}

const parseCreateOperationInputs = (req) => {
  return new OperationDTO(
    req.body.name,
    req.body.active_status,
    req.body.created_by,
    req.body.modified_by
  );
};  