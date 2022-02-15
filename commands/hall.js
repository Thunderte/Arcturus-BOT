const discord = require('discord.js');
const config = require('../configuration.json')
const mysql = require('mysql');
const english = require('../language/english.json')
const portuguese = require('../language/portuguese.json')
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
  connection.connect();
module.exports.run = async(client, message, args) => {
    connection.query("SELECT users.id,users.username,users.look,users.account_created,users.motto,users.credits,diamond.amount AS diamonds,duckets.amount AS duckets, settings.respects_received AS respects FROM users INNER JOIN users_settings AS settings ON settings.user_id = users.id LEFT JOIN users_currency AS diamond on diamond.user_id = users.id AND diamond.type = 5 LEFT JOIN users_currency AS duckets on duckets.user_id = users.id AND duckets.type = 0 ORDER BY credits,duckets,diamonds,respects DESC LIMIT ?",config.hotel.usershall, function (err, result, fields) {
        if (err){console.log(err);return;}

        var value = ''  
        result.forEach(row => {
          if (value != '') {
            value += '\n'
          }

          value += row.username +' - '+ row.credits
        });
        var diamonds = ''
        result.forEach(row => {
          if (diamonds != '') {
            diamonds += '\n'
          }

          diamonds += row.username +' - '+ row.diamonds
        });
        var duckets = ''
        result.forEach(row => {
          if (duckets != '') {
            duckets += '\n'
          }

          duckets += row.username +' - '+ row.duckets
        });

        var respects = ''
        result.forEach(row => {
          if (respects != '') {
            respects += '\n'
          }

          respects += row.username +' - '+ row.respects
        });

        const embedportuguese = new discord.MessageEmbed()
        .setTitle(portuguese.comandohall.hall)
        .setDescription(`**${portuguese.comandohall.creditos}**\n`+value)
        .addField(portuguese.comandohall.diamantes, diamonds,false)
        .addField(portuguese.comandohall.duckets, duckets, false)
        .addField(portuguese.comandohall.respeitos, respects, false)
        .setColor(config.config.colorembeds)
        .setFooter(config.hotel.hotelUrl)

        const embedenglish = new discord.MessageEmbed()
        .setTitle(english.commandhall.hall)
        .setDescription(`**${english.commandhall.credits}**\n`+value)
        .addField(english.commandhall.diamantes, diamonds, false)
        .addField(english.commandhall.duckets, duckets, false)
        .addField(english.commandhall.respects, respects, false)
        .setColor(config.config.colorembeds)
        .setFooter(config.hotel.hotelUrl)
        
        if(config.config.language == 'PT'){
          message.channel.send(embedportuguese)
        }
        else if(config.config.language == 'EN'){
          message.channel.send(embedenglish)
        }
})
}