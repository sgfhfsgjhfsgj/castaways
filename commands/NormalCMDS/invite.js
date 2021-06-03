module.exports.help = {
  name: 'invite', 	
  description: 'Sends the invite for the bot.',
  usage: "None",
  permlevel: "MEMBER",
  category: "member"
}
module.exports.run = (client, message, args) => {
  message.channel.send(`Heres my invite:\n\nhttps://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
}