class RegistrationDTO {
  constructor(
    role_id,
    email,
    password,
    full_name,
    country_code,
    mobile_no,
    gender,
    date_of_birth,
    active_status,
    created_by,
    modified_by,
    stateId,
    cityId,
    zip,
    street,
    address,countryId) {
      this.role_id = role_id,
      this.email = email,
      this.password = password,
      this.full_name = full_name,
      this.country_code = country_code,
      this.mobile_no = mobile_no,
      this.gender = gender,
      this.date_of_birth = date_of_birth,
      this.active_status = active_status,
      this.created_by = created_by,
      this.modiferby=modified_by,
      this.stateId=stateId,
      this.cityId=cityId,
      this.zip=zip,
      this.street=street,
      this.address=address,
      this.countryId=countryId
  }
}

module.exports = RegistrationDTO;