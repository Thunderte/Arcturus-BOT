const discord = require('discord.js')
var mysql = require('mysql')
const config = require('../configuration.json')
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
connection.connect();

module.exports.run = async(client, message, args) =>{
    if(config.hotel.cms == "brain"){
        connection.query("SELECT id,title,author FROM cms_news ORDER BY id DESC LIMIT 5", function (err, result) {
            if (err){console.log(err);return;}
            var news = ''
        result.forEach(row => {
          if (news != '') {
            news += '\n'
          }

          news += `${row.id} - [${row.title}](${config.hotel.hotelUrl}${config.hotel.newscmslink}${row.id})  |  Author: ${row.author} \n`
        });
            const embed = new discord.MessageEmbed()
            .setDescription(news)
            .setColor(config.config.colorembeds)
            .setFooter(config.hotel.hotelUrl)

            if(config.config.language == 'PT'){
                embed.setTitle('Noticias')
            }
            else if(config.config.language == 'EN'){
                embed.setTitle('News')
            }
            message.channel.send(embed)
        })
    }
    if(config.hotel.cms == "cosmic"){
        connection.query("SELECT id,title,author,slug FROM website_news ORDER BY id DESC LIMIT 5", function (err, result) {
            if (err){console.log(err);return;}
            var newsc = ''
        result.forEach(row2 => {
          if (newsc != '') {
            newsc += '\n'
          }

          newsc += `${row2.id} - [${row2.title}](${config.hotel.hotelUrl}${config.hotel.newscmslink}${row2.id})  |  Author: ${row2.author} \n`
        })
         const embedc = new discord.MessageEmbed()
            .setDescription(newsc)
            .setColor(config.config.colorembeds)
            .setFooter(config.hotel.hotelUrl)

            if(config.config.language == 'PT'){
                embedc.setTitle('Noticias')
            }
            else if(config.config.language == 'EN'){
                embedc.setTitle('News')
            }
            message.channel.send(embedc)
        })
}}