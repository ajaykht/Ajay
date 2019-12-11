class PermissionDTO {
    constructor(operation_id, resource_id,active_status,created_by,modified_by,url_id) {  
        this.operation_id = operation_id,
        this.resource_id = resource_id,
        this.active_status = active_status,
        this.created_by = created_by,
        this.modified_by = modified_by,
        this.urlId=url_id
    }
  }
  module.exports = PermissionDTO;