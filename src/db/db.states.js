var db = require('./db.connection');

module.exports = {
    getCitiesByState:(stateId)=>{
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_getcitybystate(?)",[stateId], (error, results) => {
        if (error)
          reject(error);
        else{
           resolve(results[0]);
        }
      })
    })
  }
}