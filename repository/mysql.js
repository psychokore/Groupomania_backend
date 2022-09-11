let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

connection.connect();

module.exports = connection;