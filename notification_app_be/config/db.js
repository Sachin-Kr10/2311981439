const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MY_SQL_PASSWORD',
  database: 'notifications_db'
})

module.exports = pool.promise()