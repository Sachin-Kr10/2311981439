const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sachin@#$db134',
  database: 'notification_app'
})

module.exports = pool.promise()