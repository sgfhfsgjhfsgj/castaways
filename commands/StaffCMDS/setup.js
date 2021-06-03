module.exports.help = {
  name: 'setup',
  description: 'A command used for basic server configuration. The bot wont work until this command is used.',
  usage: "None",
  permlevel: "SERVER_OWNER",
  category: "staff"
}
module.exports.run = (client, message, args) => {
  const Discord = require("discord.js")
  const setkey = message.guild.id;
  const u = message.mentions.users.first() || message.author;
  
  // GETTING SETTINGS FROM ENMAP //
  
  let a = client.serverSettings.get(setkey)
  let prefix = a.prefix;
  let jmsg = a.joinmsg
  let jrl = a.joinrole
  let jdm = a.joindm
  let logch = a.logchannel
  let lmsg = a.leavemessage
  
  //CREATE FUNCTION
  
  async function basicsetup() {
try{
  //Log Channel
  message.guild.channels.create('bot-logs', { //Create a channel
            type: 'text',
            permissionOverwrites: [
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        }
    ],
        }).then(channel => {


        
  //Updating the database
  
  client.serverSettings.set(setkey, `<#${channel.id}>`, "logchannel")
  
})
}catch(e){
  console.log(e)
}
        }
  
  // EMBEDS //
        
  const alreadysetEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`You've already completed setup!`)
        .setDescription('Use the help command to see the available commands.')
        .setTimestamp();
  
  //Already setup
  
  if(logch != "Not set") return message.channel.send(alreadysetEmbed);
  
  //Rest of code
        basicsetup()
        let basicsetupEmbed= new Discord.MessageEmbed() 
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Basic Server Setup Completed!`)
        .addField(`Maybe run the c!help command to see what you can do`, `Have fun!`)
        .setTimestamp();
        
      message.channel.send(basicsetupEmbed);
}