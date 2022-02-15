const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.channel.send(`${client.ws.ping} ms`)
};