const {
  logInfo,
  logError
} = require("../utils/logger.utils");
const {
  errorResponse,
  validationResponse,
  successResponse
} = require("../utils/response.utils");
const userRepo = require("../db/db.users");
const AuthDto = require("../dto/auth.dto");
const RegistrationDTO = require("../dto/registration.dto");
const ApiError = require("../utils/error.utils");
const Message = require("../utils/messages.utils");
const HttpStatus = require("http-status-codes");
const dateFormat = require('dateformat');
const UserFilterDTO = require('../dto/userfilter.dto');
const Pagination = require('../dto/pagination.dto');

module.exports = {

  authenticateUser: async (req, res, next) => {  
    let user = new AuthDto(req.body.email, req.body.password);    
    console.log(user)
    try {
      let status = await userRepo.authenticateUser(user)
      return status ?
        generateAuthToken(res, user, next) :
        validationResponse(res, HttpStatus.OK, ApiError.USER_DOESNT_EXIST);
    } catch (error) {
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
    }
  },
  getUser: async (req, res, next) => {
    var userId = req.params.userId;
    let user = await userRepo.getUser(userId);
    if (user.length==0) 
      return successResponse(res, HttpStatus.OK, ApiError.BAD_REQUEST);
    try{
      return user ?
      successResponse(res, HttpStatus.OK, {UserDeatls: user}) : errorResponse(res, HttpStatus.NOT_FOUND, ApiError.USER_NOT_FOUND);
     }catch(error){
      return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error);
     }
  },

  registerUser: async (req, res, next) => {
    try{
      let registration_dto = parseRegistrationInputs(req);     
      let status = await checkUserAlreadyExist(res, registration_dto);
      if (status === false) {
        let userId = await userRepo.insertUser(registration_dto);

        return userId && userId>0? 
        successResponse(res, HttpStatus.CREATED, Message.USER_CREATED)
        :validationResponse(res, HttpStatus.OK, Message.USER_NOT_CREATE);

        // if (userId>0)
        //   return successResponse(res, HttpStatus.CREATED, Message.USER_CREATED);
      }
    }catch(error){return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error);} 
  },
  getAllUsers: async (req, res, next) => {
    let user_dto = parseUserFilterInput(req);
    let pagination = parsePaginationInput(req);
    let status = await paginationImplementation(res, user_dto, pagination);
    if (status != true) {
      let Users = await userRepo.getAllUsers(user_dto, pagination, status);
      return Users ?
        successResponse(res, HttpStatus.OK, { pagination: status, Users }) : errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR);
    } else {
      return validationResponse(res, HttpStatus.OK, ApiError.RECORD_NOT_FOUND);
    }
  },
  updateUser: (req, res, next) => {
    res.send("user updated successfully");
  },

  deleteUser: (req, res, next) => {
    res.send("user deleted successfully");
  }
}

const generateAuthToken = (res, user, next) => {
  res.user = user;
  return next();
}

const checkUserAlreadyExist = async (res, registration_dto) => {

  let status = await userRepo.checkUserEmailAlreadyExist(registration_dto)
    .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));

  if (status === true)
    return validationResponse(res, HttpStatus.OK, ApiError.USER_EMAIL_AlREADY_EXIST);

  status = await userRepo.checkUserMobileNoAlreadyExist(registration_dto)
    .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR,error));

  if (status === true)
    return validationResponse(res, HttpStatus.OK, ApiError.USER_MOBILE_NO_AlREADY_EXIST);

  return status;
}
const paginationImplementation = async (res, user_dto, pagination) => {
  let status = await userRepo.paginationImplementation(user_dto, pagination)
    .catch(error => errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiError.UNKNOWN_ERROR, error));
  return status;
}

const parseRegistrationInputs = (req) => {
  return new RegistrationDTO(
    req.body.role_id,
    req.body.email,
    req.body.password,
    req.body.full_name,
    req.body.country_code,
    req.body.mobile_no,
    req.body.gender,
    dateFormat(Date.parse(req.body.date_of_birth), "yyyy-mm-dd h:MM:ss"),
    req.body.active_status,
    req.body.created_by,
    req.body.modified_by,
    req.body.stateId,
    req.body.cityId,
    req.body.zip,
    req.body.street,
    req.body.address,
    req.body.countryId
  );
};
const parseUserFilterInput = (req) => {
  return new UserFilterDTO(
    req.body.user_filter.active_status,
    req.body.user_filter.userId,
    req.body.user_filter.username,
    req.body.user_filter.roleId,
    req.body.user_filter.cityId
  );
};

const parsePaginationInput = (req) => {
  return new Pagination(
    req.body.user_filter.pagination.page_no,
    req.body.user_filter.pagination.total,
    req.body.user_filter.pagination.pages,
    req.body.user_filter.pagination.orderby,
    req.body.user_filter.pagination.sorting_by_asc,
    req.body.user_filter.pagination.page_size
  );
};