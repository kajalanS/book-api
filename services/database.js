const mysql = require("mysql");
const db = require("../database.json");

const conn = mysql.createPool({
  host: db.dev.host,
  user: db.dev.user,
  password: db.dev.password,
  database: db.dev.database,
});

// conn.connect();

/**
 * create a new pool connection
 * @param {(err: mysql.MysqlError, connection: mysql.PoolConnection) => void} call
 * @returns
 */
// const pool = function connect(call) {
//   conn.getConnection(call);
// };

module.exports = conn;
