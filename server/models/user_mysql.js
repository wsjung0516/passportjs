var config = require('../config.json');
// var bcrypt = require('bcrypt-nodejs');
// var Q = require('q');
// var _ = require('lodash');
// var jwt = require('jsonwebtoken');
var conn = require('../config/mysqlconn')();

module.exports.findAll = function(callback) {
    conn.query("SELECT * FROM users ORDER BY id DESC", callback);
};


module.exports.addUser = function(data, callback) {
    conn.query("INSERT INTO users SET ?", data, callback);
};
/*
module.exports.authenticate= function(username, password) {
    var deferred = Q.defer();
    findOne ( username ,function (err,user) {
        if(err) deferred.reject(err.name + ':' + err.message);
        var str = JSON.stringify(user);
        user = JSON.parse(str)[0];
        //console.log("user",user.hashedpassword);
        if(user && bcrypt.compareSync(password,user.hashedpassword)) {
            deferred.resolve({
                _id:user._id,
                username:user.username,
                token:jwt.sign({sub:user._id},config.secret)
            });
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};
*/

/*
function findName(username, callback) {
    conn.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
};
*/
module.exports.updateUser = function(data, callback) {
    var username = data.username;
    var id = data.id;
    var password = data.password;
    var sql = 'UPDATE users SET username=?,password=? WHERE id= ?';
    conn.query(sql, [username,password,id], callback);
};
module.exports.deleteUser = function(data, callback) {
    var id = data.id;
    var sql = 'DELETE FROM users WHERE id= ?';
    conn.query(sql, [id], callback);
};

module.exports.findByUsername = function(username, callback) {
    conn.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
};
module.exports.findByUserid = function(userid, callback) {
    conn.query("SELECT * FROM users WHERE id = '" + userid + "'", callback);
};

/*
module.exports.encrypt = function(data, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, temp,callback);
    });
    function temp(rvalue) {
        //console.log(rvalue);
    }
};
*/

module.exports.sendResponse = function(success, res) {
    if(success) {
        res.send({'success': 'true'});
    } else {
        res.send({'success': 'false'});
    }
};
