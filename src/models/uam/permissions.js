class Permission {
    constructor(id, operation_id, resource_id,active_status,created_by,modified_by,created_date,modified_date,op_name,rs_name,url,url_name,url_description) {
        this.id = id,
        this.operation_id = operation_id,
        this.resource_id = resource_id,
        this.op_name=op_name,
        this.res_name=rs_name,
        this.active_status = active_status,
        this.created_by = created_by,
        this.modified_by = modified_by,
        this.created_date=created_date,
        this.modified_date=modified_date,
        this.url=url,
        this.url_name=url_name,
        this.url_description=url_description
    }
  }
  module.exports = Permission;