const jwt = require("jsonwebtoken");
const fs = require("fs");
const ApiError = require("../utils/error.utils");
const HttpStatus = require("http-status-codes");
const {
  validationResponse,
  successResponse
} = require("../utils/response.utils");
const Message = require("../utils/messages.utils");

module.exports = {

  createAuthToken: (req, res, next) => {
    let secretKey = readSecretKey();
    let token = jwt.sign({
      user: res.user
    }, secretKey, {
      expiresIn: '12h'
    })
    return successResponse(res, HttpStatus.OK, token);
  },

  verifyAuthToken: (req, res, next) => {

    if (skipVerification(req.path)) return next();

    const bearerHeader = req.headers["authorization"];
    if (typeof (bearerHeader) != 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    } else
      return validationResponse(res, HttpStatus.FORBIDDEN, ApiError.ACCESS_DENIED);
  },

  authenticateToken: (req, res, next) => {

    if (skipVerification(req.path)) return next();
    let secretKey = readSecretKey();

    try {
      let user = jwt.verify(req.token, secretKey);
      req.user = user;
    } catch (error) {
      return validationResponse(res, HttpStatus.OK, ApiError.TOKEN_EXPIRED)
    };

    //TODO: Authenticate user token validity (token+expiry) from database
    // Go to next only if its a valid token
    return next();
  }
}

const skipVerification = (path, httpMethod = "POST") =>
  (path === "/users/auth" ||
    (path === "/users" && httpMethod === "POST") ||
   ( path === "/countries" && httpMethod === "POST")||
   (path==="/states")
  ) ? true : false

const readSecretKey = () => fs.readFileSync(`jwt.pk`, 'utf8')