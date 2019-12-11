class OperationDTO {
    constructor(name, active_status, created_by,modified_by) {
      this.name = name,
        this.active_status = active_status,
        this.created_by = created_by,
        this.modified_by =modified_by
    }
  }
  module.exports = OperationDTO;