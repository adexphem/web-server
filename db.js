const dbConn = require('./utilities')
const { Pool } = require('pg');

const pool = new Pool({
  user: dbConn.user,
  password: dbConn.password,
  database: dbConn.database,
  host: dbConn.host,
  port: dbConn.port
});

module.exports = pool;