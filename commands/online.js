var mysql = require('mysql');
const config = require('../configuration.json')
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
connection.connect();
        module.exports.run = async(client, message, args) => {
        connection.query("SELECT username FROM users WHERE online = '1'", function (err, result) {
            if (err){console.log(err);return;}
            message.channel.send(result.length + ` ${config.hotel.hotelName}'s online`)
        });
    };
