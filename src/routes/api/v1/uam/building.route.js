const {
    Router
  } = require('express');
  const {
    createBuilding
   
  } = require('../../../../controllers/uam/building.ctrl');
//   const {
//     validate
//   } = require("../../../../middlewares/operation.validator.mw");

  
  const router = Router();

  router.post("/", createBuilding);
 
  module.exports = router;