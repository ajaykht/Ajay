class BuildingDTO {
    constructor(building_code, name, location, no_of_floors, no_of_units, rent_close_date,
          management_fee, remark, status, address_id, created_by, created_date, modified_by, modified_date,street,
          cityid,country_id,address,zip,stateid ) {  
        this.building_code = building_code,
        this.name = name,
        this.location = location,
        this.no_of_floors = no_of_floors,
        this.no_of_units = no_of_units,
        this.rent_close_date = rent_close_date,
        this.management_fee = management_fee,
        this.remark = remark,
        this.status = status,
        this.address_id=address_id,
        this.created_by = created_by,
        this.created_date=created_date,
        this.modified_by = modified_by,
        this.street=street,
        this.cityid=cityid,
        this.country_id=country_id,
        this.address=address,
        this.zip=zip,
        this.stateid=stateid
    }
  }
  module.exports = BuildingDTO;