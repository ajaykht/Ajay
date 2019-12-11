var db = require('./db.connection');

module.exports = {
  getCountries:()=>
  {
    return new Promise((resolve, reject) => {
      db.query(`call sp_proc_getcountry()`,[], (error, results) => {
        if (error)
          reject(error);
        else{
           resolve(results[0]);
        }
      })
    });
  },
  getStatesByCountry:(countriesId)=>
  {
    return new Promise((resolve, reject) => {
      db.query("call sp_proc_getstatebycountry(?)",[countriesId], (error, results) => {
        if (error)
          reject(error);
        else{
           resolve(results[0]);
        }
      })
    });
  },
}