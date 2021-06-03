module.exports.help = {
  name: 'settings',
  description: 'A command used to manage server specific settings such as the prefix.',
  usage: "{setting} <newValue>",
  permlevel: "ADMINISTRATOR",
  category: "staff"
}

module.exports.run = (client, message, args) => {
  
  const Discord = require("discord.js")
  // GETTING SETTINGS FROM ENMAP //
  const u = message.mentions.users.first() || message.author;
  
  const setkey = message.guild.id;
  let a = client.serverSettings.get(setkey)
  let prefix = a.prefix;
  let jmsg = a.joinmsg
  let jrl = a.joinrole
  let jch = a.joinchannel
  let jdm = a.joindm
  let logch = a.logchannel
  let lmsg = a.leavemsg
  let lch = a.leavechannel
  
  // EMBEDS //
  
  const settingschoiceEmbed = new Discord.MessageEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor("BLUE")
        .setAuthor(`Available Settings for ${message.guild.name}`, message.guild.iconURL())
        .addField(`Prefix`, prefix)
        .addField('Logchannel', logch)
        .addField('Joinmsg', jmsg)
        .addField('Joinchannel', jch)
        .addField('Joindm', jdm)
        .addField('Joinrole', jrl)
        .addField('Leavemsg', lmsg)
        .addField('Leavechannel', lch)
        .setTimestamp();
        
  const missingArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('Usage: !settings <setting> <newValue>')
        .setTimestamp();
        
  const incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('That isnt one of our settings. Run the settings command alone to see your options.')
        .setTimestamp();
        
  let errEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Unexpected Error!')
        .setDescription('Command Failed')
        .setTimestamp();
        
  let notroleEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('That isnt a role!')
        .setDescription('Try setting a role instead of a string. (e.g @Admin)')
        .setTimestamp();
        
    let notchannelEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('That isnt a channel!')
        .setDescription('Try setting a channel instead of a string. (e.g #general)')
        .setTimestamp();
  
  // NO ARGS //
  if(!args[0]) {
   return message.channel.send(settingschoiceEmbed);
    
}
  
//Options
const [prop, ...value] = args;
  
if(!client.serverSettings.has(message.guild.id, prop)) {

return message.channel.send(incorrectArgsEmbed)

}

if(/role/.test(prop) && !/^<@&(\d+)>$/.test(value)) return message.channel.send(notroleEmbed)

if(/channel/.test(prop) && !/^<#(\d+)>$/.test(value)) return message.channel.send(notchannelEmbed)

client.serverSettings.set(message.guild.id, value.join(" "), prop);

// We can confirm everything's done to the client.

let successEmbed= new Discord.MessageEmbed() 
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`${prop} has been changed!`)
        .addField(`New ${prop}:`,value.join(" "))
        .setTimestamp();
        
      message.channel.send(successEmbed);
      let cid = logch.replace(/^<#(\d+)>$/, '$1');
      message.guild.channels.cache.get(cid).send(successEmbed)
  }