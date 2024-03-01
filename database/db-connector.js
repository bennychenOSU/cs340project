var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_chenben',
    password        : 'OqUXFrFjGb68',
    database        : 'cs340_chenben'
})

module.exports.pool = pool;