var db = require('./db.connection');


module.exports = {
  authenticateUser: ({
    email,
    password
  }) => {
    return new Promise((resolve, reject) => { 

      db.query("select count(*) as user_count from users where email=? and password=?", [email, password], (error, results) => {              

        if (error)
          reject(error);
        else if (results[0].user_count === 1)
          resolve(true);
        else
          resolve(false);
      })
    })
  },
  paginationImplementation(user_dto, pagination) {
    return new Promise((resolve, reject) => {
      db.query("call sp_totaluser(?,?,?,?,?)", [user_dto.active_status, user_dto.userId, user_dto.username, user_dto.cityId, user_dto.roleId], (error, results) => {
       var totalPage= (results[0][0].count);
          if (error)
            reject(error);
          else if (totalPage < 1)
            resolve(true);
          else if (totalPage >= 1)
            var page_no = pagination.page_no;
          let numPerPage = pagination.page_size;
          let temp = parseInt(pagination.page_no);
          let page = ((temp - 1) * 10);
          let pages;
          var total = totalPage;
          pages = Math.ceil(total / numPerPage);
          var pageNumber = temp - 1;
          var sorting_by_asc =pagination.sorting_by_asc;
          var orderby=pagination.orderby;
          var page_size =pagination.page_size;
          let user = { page_no,total,pages,orderby,sorting_by_asc, page_size,page }
          if (pageNumber < user.pages)
            resolve(user);
          else
            resolve(true);
        })
      
    });
  },
  checkUserEmailAlreadyExist({
    email
  }) {
    return new Promise((resolve, reject) => {
      db.query("select count(*) as user_count from users where email=?", [email], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].user_count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },

  checkUserMobileNoAlreadyExist({
    mobile_no
  }) {
    return new Promise((resolve, reject) => {
      db.query("select count(*) as user_count from users where mobile_no=?", [mobile_no], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].user_count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
  insertUser: (
    {street,
      stateId,
      cityId,
      country_code,
      address,
      zip,
      email,
      password,
      mobile_no,
      role_id,
      full_name,
      gender,
      date_of_birth,
      active_status,
      created_by,
      modiferby,
      countryId}) => {
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_adduser(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          street,
          stateId,
          cityId,
          country_code,
          address,
          zip,
          email,
          password,
          mobile_no,
          role_id,
          full_name,
          gender,
          date_of_birth,
          active_status,
          created_by,
          modiferby,
          countryId
        ],
        (error, results) => {
          if (error)
            reject(error);
          else
            resolve(results[0][0].userId);
        })
    })
  },

  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_getuserbyid(?)", [userId], (error, results) => {
        if (error)
          reject(error);
        else
          resolve(results[0]);
      })
    });
  },
  getAllUsers: (user_dto, pagination, status) => {
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_getalluser(?,?,?,?,?,?,?,?,?)", [user_dto.active_status, user_dto.userId, user_dto.username, user_dto.cityId, user_dto.roleId, status.page, pagination.page_size, pagination.orderby, pagination.sorting_by_asc], (error, results) => {
        if (error)
          reject(error);
        else {
          resolve(results[0]);
        }
      })
    })
  },
}
