module.exports = (client, guild) => {

const Discord = require("discord.js")

// EMBEDS //

const ownerEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor("BLUE")
        .setAuthor(client.user.tag, client.user.avatarURL())
        .setTitle('Thanks for adding me!')
        .addField(`Hey! Im a small bot created for all around server management. I hope i can help you out, try the help command to see what you can do.`, `My default prefix is c!`)
        .setTimestamp();

// ENMAPS //
 
  client.serverSettings.set(guild.id, {
  prefix: "c!",
  oldprefix: "Not set",
  logchannel: "Not set",
  joinrole: "Not set",
  joinchannel: "Not set",
  joinmsg: "Not set",
  joindm: "Not set",
  leavemsg: "Not set",
  leavechannel: "Not set",
})

// MESSAGING GUILD OWNER //

guild.owner.send(ownerEmbed)

}