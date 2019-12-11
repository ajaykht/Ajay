class UserFilterDTO {
    constructor(active_status,userId,username,roleId,cityId){
        this.active_status=active_status,
        this.userId=userId ,
        this.username=username,
        this.roleId=roleId,
        this.cityId=cityId
    }
}
module.exports = UserFilterDTO;

