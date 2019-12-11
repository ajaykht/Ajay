class ResourcesDTO {
    constructor(name, description, created_by,modified_by) {
      this.name = name,
        this.description = description,
        this.created_by = created_by,
        this.modified_by =modified_by
    }
  }
  module.exports = ResourcesDTO;