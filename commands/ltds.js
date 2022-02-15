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
        connection.query("SELECT catalog_items.catalog_name,catalog_items.page_id,catalog_items.limited_stack,catalog_pages.caption,catalog_pages.id FROM catalog_items,catalog_pages WHERE catalog_items.limited_stack >= 1 AND catalog_items.page_id=catalog_pages.id ORDER BY catalog_items.limited_stack LIMIT 5", function (err, result) {
            if (err){console.log(err);return;}
            var news = ''
        result.forEach(row => {
          if (news != '') {
            news += '\n'
          }

          news += `${row.catalog_name} | ${row.caption} \n`
        });
            const embed = new discord.MessageEmbed()
            .setDescription(news)
            .setColor(config.config.colorembeds)
            .setFooter(config.hotel.hotelUrl)

            if(config.config.language == 'PT'){
                embed.setTitle('Raros disponíveis')
            }
            else if(config.config.language == 'EN'){
                embed.setTitle('Rare available')
            }
            message.channel.send(embed)
        })
    }