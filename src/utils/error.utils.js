module.exports = {
  BAD_REQUEST:{
    code: 4003,
    message: "Bad request!!"
  },
  ACCESS_DENIED: {
    code: 4000,
    message: "Access denied"
  },
  TOKEN_EXPIRED: {
    code: 4001,
    message: "Token expired"
  },
  UNKNOWN_ERROR: {
    code: 5000,
    message: "Unknown error !!!"
  },
  MISSING_EMAIL_ID: {
    code: 6000,
    message: "Invalid email"
  },
  MISSING_PASSWORD: {
    code: 6001,
    message: "A minimum 5 characters password contains."
  },
  USER_DOESNT_EXIST: {
    code: 6002,
    message: "User doesn't exist"
  },
  USER_EMAIL_AlREADY_EXIST: {
    code: 6003,
    message: "User with given emailId already exist"
  },
  USER_MOBILE_NO_AlREADY_EXIST: {
    code: 6004,
    message: "User with given mobile no already exist"
  },
   PERMISSION_AlREADY_EXIST: {
    code: 6005,
    message: "Permission with given resourceId, operationId already exist"
  },
  MISSING_CREATED_BY: {
    code: 6006,
    message: "Invalid created_by"
  },
  MISSING_MODIFIED_BY: {
    code: 6007,
    message: "Invalid Modified_by"
  },
  ROLE_AlREADY_EXIST: {
    code: 6008,
    message: "Role with given role name already exist"
  },
  USER_NOT_EXIST: {
   code: 6009,
   message: "Userid not exist"
 },
 CREATE_RESOURCES:{
   code:6010,
   message:"resource created successfully"
 },
 OPERATIONID_NOT_EXIST: {
   code: 6011,
   message: "operationid does not exist"
 },
 RESOURCEID_NOT_EXIST: {
   code: 6012,
   message: "ResourceId does not exist"
 },
 OPERATION_ALREADY_EXIST:{
   CODE :6013,
   message:"operation already exist"
 },
 RESOURCE_ALREADY_EXIST:{
   CODE :6014,
   message:"resource already exist "
 },
 PERMISSIONID_AlREADY_EXIST: {
   code: 6015,
   message: "Permission id ${0}  already exist"
 },
  ROLES_NOT_FOUND: {
    code: 7000,
    message: "Roles not found"
  },
  COUNTRY_NOT_FOUND: {
    code: 7001,
    message: "Countries not found"
  },
  CITY_NOT_FOUND: {
    code: 7002,
    message: "Cities not found"
  },
  STATE_NOT_FOUND: {
    code: 7003,
    message: "States not found"
  },
  USER_NOT_FOUND: {
    code: 7004,
    message: "Users not found"
  },
  INVALID_COUNTRYID: {
    code: 7005,
    message: "Invalid CountryId"
  },
  STATEID_NOT_FOUND: {
    code: 7006,
    message: "Invalid StateId"
  },
  PERMISSIONS_NOT_FOUND: {
    code: 7007,
    message: "Permissions not found"
  },
  INVALID_PERMISSIONID: {
    code: 7008,
    message: "Invalid PermissionId"
  },
  INVALID_RESOURCEID: {
    code: 7009,
    message: "Invalid ResourceId"
  },
  INVALID_OPERATIONID: {
    code: 7010,
    message: "Invalid OperationId"
  },
  PERMISSION_NOT_FOUND: {
    code: 7011,
    message: "Permission not found"
  },
  OPERATION_NOT_FOUND: {
    code: 7012,
    message: "Operation not found"
  },
  MISSING_ACTIVE_STATUS: {
    code: 7013,
    message: "Invalid  active_status"
  },
  ROLEID_NOT_FOUND: {
    code: 7014,
    message: "RoleId not exist"
  },
  INVALID_OPERATIONID: {
    code: 7015,
    message: "Invalid operationid"
  },
  INVALID_URLID: {
    code: 7016,
    message: "Invalid url_Id"
  },
  FEATURES_NOT_FOUND: {
    code: 7017,
    message: "Features not found"
  },
  INVALID_OPERATIONID: {
    code: 7005,
    message: "Invalid operationid"
  },
  REQUIRED_IDS: {
   code: 8000,
   message: "ID should be one of PermissionId/ OperationId/ ResourceId"
 },
  MISSING_NAME: {
    code: 8000,
    message: "Invalid name"
  },
  MISSING_DESCRIPTION: {
    code: 8001,
    message: "Invalid description"
  }, 
  MISSING_RESOURCEID: {
    code: 8004,
    message: "Invalid resourceId"
  },
  MISSING_ROLEID: {
    code: 8005,
    message: "Invalid roleId"
  },
  MISSING_ROLENAME: {
    code: 8006,
    message: "Invalid Role name"
  },
  MISSING_ACTION: {
    code: 8007,
    message: "Invalid action"
  },
  PERMISSIONIDS_ARRAY: {
    code: 8008,
    message: "At least one permissionId is required into array"
  },
  MISSING_COUNTRYID: {
    code: 8009,
    message: "Invalid country id"
  },
  MISSING_MOBILE_NO: {
    code: 8010,
    message: "Invalid mobile_no"
  },
  MISSING_DATE_OF_BIRTH: {
    code: 8011,
    message: "Invalid date_of_birth (YYYY-MM-DD)"
  },
  MISSING_STATEID: {
    code: 8012,
    message: "Invalid state id"
  },
  MISSING_CITY_ID: {
    code: 8013,
    message: "Invalid city id"
  },
  MISSING_ZIP: {
    code: 8014,
    message: "Invalid zip"
  },
  MISSING_MOBILE_DIGIT: {
    code: 8015,
    message: "Mobile No. should have min 10 to 15 digit."
  },
  MISSING_COUNTRY_CODE: {
    code: 8016,
    message: "Invalid country code"
  },
  
  RECORD_NOT_FOUND:{
    code: 8015,
    message: "No record found"
  },
  MISSING_USERNAME: {
    code: 8016,
    message: "Invalid username"
  },
  MISSING_CITYID: {
    code: 8017,
    message: "Invalid cityId"
  },
  MISSING_PAGENUMBER: {
    code: 8018,
    message: "Invalid page_no"
  },
  MISSING_TOTALPAGENUMBER: {
    code: 8019,
    message: "Invalid total pages"
  },
  MISSING_PAGES: {
    code: 8020,
    message: "Invalid pages"
  },
  MISSING_ORDERBY: {
    code: 8021,
    message: "Invalid orderby"
  },
  MISSING_SORTING_BY_ASC: {
    code: 8022,
    message: "Invalid sorting_by_asc"
  },
  MISSING_PAGE_SIZE: {
    code: 8023,
    message: "Invalid page_size"
  },
}

