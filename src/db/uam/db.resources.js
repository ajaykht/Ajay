const db = require('../db.connection');
const {
  logError
} = require("../../utils/logger.utils");

module.exports = {
  getAllResources: () => {
    return new Promise((resolve, reject) => { 
      db.query("call sp_proc_getresource()",[], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0)
          resolve(null);
        else {
          resolve(results[0]);
        }
      })
    });
  },
  insertResource: (resources_dto) => {
    const {
    name,
    description,
    created_by,
    modified_by
    } = resources_dto;
    return new Promise((resolve, reject) => {
   db.query("call sp_proc_addresource(?,?,?,?)",
        [  name,
          description,
          created_by,
          modified_by
        ],
        (error, result) => { 
          if (error)
            reject(error);
          else
            resolve(result);
        })
    })
  },
  checkAlreadyExistResource({
    name
  }) {
    return new Promise((resolve, reject) => {
      db.query("select count(*) as resources_count from resources where name=?",[name], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].resources_count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    })
  },
  deleteResource(resourceId){
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_deleteresource(?)",[resourceId], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows)
          resolve(true);
        else
          resolve(false);
      })
    });
  }
}
