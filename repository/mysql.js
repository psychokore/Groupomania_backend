let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'adminmdp',
  database : 'groupomania'
});

connection.connect();

module.exports = connection;