const {
    Router
  } = require('express');
  const {
    getAllResources,
    createResource,
    deleteResource
  } = require('../../../../controllers/uam/resources.ctrl');
  const router = Router();
  const {
    validate
  } = require("../../../../middlewares/resources.validator.mw");
  
  router.get("/", getAllResources);
  router.delete("/:resourceId",validate('deleteResource'), deleteResource);
  router.post("/",validate('createResource'),createResource);
  
  module.exports = router;