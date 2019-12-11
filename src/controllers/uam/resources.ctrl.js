const {
    logInfo
  } = require("../../utils/logger.utils");
  const HttpStatus = require("http-status-codes");
  const Message = require("../../utils/messages.utils");
  const resourcesRepo = require("../../db/uam/db.resources")
  const {
    validationResponse,
    successResponse,
    errorResponse
  } = require('../../utils/response.utils');
  const ApiError = require("../../utils/error.utils")
  const ResourcesDTO = require("../../dto/resources.dto")

  module.exports = {
    getAllResources: async (req, res, next) => {
    try{
      let resources = await resourcesRepo.getAllResources();
      return resources ?
      successResponse(res, HttpStatus.OK, {resources: resources}) :errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.RESOURCES_NOT_EXITS);
     }catch(error){
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
     }
    },
   createResource: async (req, res, next) => {
    
         let resources_dto = parseCreateResourceInputs(req);
         try{
         let status = await checkAlreadyExistResource(res, resources_dto);
         if (status === false) {
          let result = await resourcesRepo.insertResource(resources_dto)
         .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
         if (result.length != 1)
         return successResponse(res, HttpStatus.OK, Message.RESOURCE_CREATED);}}
         catch(error){
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
     }
   },
   deleteResource: async (req, res, next) => {
    try{
      var resourceId = req.params.resourceId;
      const status = await resourcesRepo.deleteResource(resourceId)
      .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
      if(status==true)  return successResponse(res, HttpStatus.CREATED, Message.RESOURCE_DELETED);
      else return validationResponse(res, HttpStatus.OK, ApiError.RESOURCEID_NOT_EXIST);
    } catch(error){
    return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);}
     }
  }
 const checkAlreadyExistResource = async (res, resources_dto) => {
   try{
  let status = await resourcesRepo.checkAlreadyExistResource(resources_dto)
  .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));
  if (status === true) return validationResponse(res, HttpStatus.OK, ApiError.RESOURCE_ALREADY_EXIST);
   return status;
   }
   catch(error){
    return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
     }
}

const parseCreateResourceInputs = (req) => {
  return new ResourcesDTO(
    req.body.name,
    req.body.description,
    req.body.created_by,
    req.body.modified_by
  );
};  