const {
    Router
  } = require('express');
  const {
    getAllOperations,
    createOperation,
    deleteOperation,
    getFeatures
  } = require('../../../../controllers/uam/operations.ctrl');
  const {
    validate
  } = require("../../../../middlewares/operation.validator.mw");

  
  const router = Router();

  router.post("/",validate('createOperation'), createOperation);
  router.get("/", getAllOperations);
  router.delete("/:id",validate('deleteOperation'), deleteOperation);
  router.get("/features", getFeatures);
  module.exports = router;