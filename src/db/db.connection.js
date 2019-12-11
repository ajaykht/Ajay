const mysql = require('mysql');
const enviroment = require("../config/env");
var pool = mysql.createPool(enviroment.db)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      throw new Error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      throw new Error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      throw new Error('Database connection was refused.');
    }
  }
  if (connection) connection.release()
  return
})

module.exports = pool;