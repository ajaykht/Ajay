const db = require('../db.connection');
const Features = require("../../dto/features.dto");

const {
  logError
} = require("../../utils/logger.utils");

module.exports = {
    getAllOperations: () => {
    return new Promise((resolve, reject) => { 
      db.query("call sp_proc_getoperation(?,?)",['',''], (error, results) => {
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
  checkAlreadyExistOperation({
    name
  }) {
    return new Promise((resolve, reject) => {
      db.query("select count(*) as operation_count from operations where name=?",[name], (error, results) => {
        if (error)
          reject(error);
        else if (results[0].operation_count >= 1)
          resolve(true);
        else
          resolve(false);
      })
    })
  },
  insertoperation: (operation_dto) => {
    const {
    name,
    active_status,
    created_by,
    modified_by
    } = operation_dto;
    return new Promise((resolve, reject) => {
   db.query("call sp_proc_addoperation(?,?,?,?)",
        [  name,
          active_status,
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
  deleteOperation(operationId){
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_deleteoperation(?)",[operationId], (error, results) => {
        if (error)
          reject(error);
        else if (results.affectedRows)
          resolve(true);
        else
          resolve(false);
      })
    });
  },
   getOperationUrl: () => {
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_getfeaturesurl()`,[], (error, results) => {
        if (error) {
          reject(error);
        }else if(results[0].length>0) {
          resolve(mapFeatures(results[0]));
        }
      })
    });
  }
}
const mapFeatures = (results) => {
  const features = new Array();
  results
    .map(feature => {
      feature.url_description=feature.url_description==null?'':feature.url_description;
      features.push(new Features(feature.id, feature.url, feature.name,feature.url_description));
    });
  return features;
}