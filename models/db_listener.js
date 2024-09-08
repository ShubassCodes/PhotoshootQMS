const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  const listener = new MySQLEvents(connection, {
    startAtEnd: true,
    includeSchema: {
        'qmsphoto_qmsdb': ['photobooths']
    }
  });

  module.exports = listener;