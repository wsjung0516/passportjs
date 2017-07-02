var mysql = require('mysql');
module.exports = function () {
    var conn = mysql.createConnection({
        host: 'ec2-52-79-93-119.ap-northeast-2.compute.amazonaws.com',
        user: 'root',
        password: 'wssj0516',
        database: 'WASS'
  });

  conn.connect(function() {
    //console.log("Database connected");
  });
  return conn;
};

/*
var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit : 10,
  host: 'wass.ct8cfw60phpr.ap-northeast-2.rds.amazonaws.com',
  user: 'wsjung',
  password: 'wssj0516',
  database: 'WASS'
});


var conn = (function () {

  function _query(query, params, callback) {
    pool.getConnection(function (err, connection) {
      //console.log("getConnection ");
      if (err) {
        console.log("getConnection Error",err);
        connection.release();
        callback(null, err);
        throw err;
      }

      connection.query(query, params, function (err, rows) {
      });
      //console.log("connection released");
      connection.release();
    });
  }

  return {
    query: _query
  };
})();

module.exports = conn;
*/

