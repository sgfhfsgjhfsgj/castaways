module.exports.help = {
  name: 'ping', 	
  description: 'Very basic and useless command. Mainly used to check if the bots online',
  usage: "None",
  permlevel: "MEMBER",
  category: "member"
}
module.exports.run = (client, message, args) => {
  message.reply(`Pong!`);
}