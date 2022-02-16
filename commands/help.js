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
    if(config.config.language == 'EN'){
        const embedenglish = new discord.MessageEmbed()
        .setTitle(english.commandhelp.commands)
        .setDescription(`To trigger the command type ${config.prefix}command`)
        .addField(english.commandhelp.ping, english.commandhelp.pingdesc, true)
        .addField(english.commandhelp.online, english.commandhelp.onlinedesc, true)
        .addField(english.commandhelp.hall, english.commandhelp.halldesc, true)
        .addField(english.commandhelp.ltds, english.commandhelp.ltdsdesc, true)
        .addField(english.commandhelp.noticias, english.commandhelp.newsdesc, true)
        .addField(english.commandhelp.userinfo, english.commandhelp.userinfodesc, true)
        .addField(english.commandhelp.help, english.commandhelp.helpdesc, true)
        .setColor(config.config.colorembeds)
        .setFooter(config.hotel.hotelUrl)

        message.channel.send(embedenglish)
    }
    else if(config.config.language == 'PT'){
        const embedportuguese = new discord.MessageEmbed()
        .setTitle(portuguese.comandohelp.comandos)
        .setDescription(`Para executar um comando digite ${config.prefix}command`)
        .addField(portuguese.comandohelp.ping, portuguese.comandohelp.pingdesc, true)
        .addField(portuguese.comandohelp.online, portuguese.comandohelp.onlinedesc, true)
        .addField(portuguese.comandohelp.hall, portuguese.comandohelp.onlinedesc, true)
        .addField(portuguese.comandohelp.ltds, portuguese.comandohelp.ltdsdesc, true)
        .addField(portuguese.comandohelp.news, portuguese.comandohelp.newsdesc, true)
        .addField(portuguese.comandohelp.userinfo, portuguese.comandohelp.userinfodesc, true)
        .addField(portuguese.comandohelp.help, portuguese.comandohelp.helpdesc, true)
        .setColor(config.config.colorembeds)
        .setFooter("ArcBOT por Desenvolvimento de habbos: https://discord.gg/YDmbap49bJ")
        message.channel.send(embedportuguese)
    }
  }
