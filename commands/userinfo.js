const Discord = require('discord.js')
require('dotenv').config()
var mysql = require('mysql');
const english = require('../language/english.json')
const portuguese = require('../language/portuguese.json')
const config = require('../configuration.json')
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
connection.connect();
        module.exports.run = async(client, message, args) => {
          setTimeout(function(){
            connection.query("SELECT users.id,users.online,users.username,users.look,users.account_created,users.motto,users.credits,diamond.amount AS diamonds,duckets.amount AS duckets, settings.respects_received AS respects FROM users INNER JOIN users_settings AS settings ON settings.user_id = users.id LEFT JOIN users_currency AS diamond on diamond.user_id = users.id AND diamond.type = 5 LEFT JOIN users_currency AS duckets on duckets.user_id = users.id AND duckets.type = 0 WHERE users.username = ?",args[0], function (err, result, fields) {
                if (err){console.log(err);return;}
                if(result.length >= 1){
                  const embedenglish = new Discord.MessageEmbed()
                  .setTitle(result[0].username)
                  .setImage(config.hotel.fpath +`?figure=${result[0].look}${config.config.avatarurlgesture}`)
                  .setDescription(`[${english.profile}](${config.hotel.hotelUrl}${config.hotel.profilehome}${result[0].username})`)
                  .setColor(config.config.colorembeds)
                  .addField(`${english.commanduserinfo.credits}`, result[0].credits, true)
                  .addField(`${english.commanduserinfo.diamonds}`, result[0].diamonds, true)
                  .addField(`${english.commanduserinfo.duckets}`, result[0].duckets, true)
                  .addField(`${english.commanduserinfo.respects}`, result[0].respects, true)
                  .setFooter(result[0].motto)
                  if(result[0].online == 1){
                    embedenglish.addField('Online', 'Yes', true)
                  }
                  else if(result[0].online == 0){
                    embedenglish.addField('Online', 'Not', true)
                  }

                  const embedportuguese = new Discord.MessageEmbed()
                  .setTitle(result[0].username)
                  .setImage(config.hotel.fpath +`?figure=${result[0].look}${config.config.avatarurlgesture}`)
                  .setDescription(`[${portuguese.perfil}](${config.hotel.hotelUrl}${config.hotel.profilehome}${result[0].username})`)
                  .setColor(config.config.colorembeds)
                  .addField(`${portuguese.comandouserinfo.creditos}`, result[0].credits, true)
                  .addField(`${portuguese.comandouserinfo.diamantes}`, result[0].diamonds, true)
                  .addField(`${portuguese.comandouserinfo.duckets}`, result[0].duckets, true)
                  .addField(`${portuguese.comandouserinfo.creditos}`, result[0].respects, true)
                  .setFooter(result[0].motto)
                  if(result[0].online == 1){
                    embedportuguese.addField('Online', 'Sim', true)
                  }
                  else if(result[0].online == 0){
                    embedportuguese.addField('Online', 'Não', true)
                  }
                    if(config.config.language == 'PT'){
                      message.channel.send(embedportuguese)
                    }
                    else if(config.config.language == 'EN'){
                      message.channel.send(embedenglish)
                    }
                }
                else message.channel.send('Usuário inexistente | The user dont exist!');
            });
          },01)
          
        }