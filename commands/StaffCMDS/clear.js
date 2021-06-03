module.exports.help = {
  name: 'clear',
  description: 'A command used to clear a certain amount of messages from a channel',
  usage: "<amount>",
  permlevel: "MANAGE_MESSAGES",
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
        
  let incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('You need to specify an amount of messages to delete!')
        .setTimestamp();
        
  //REST OF CODE
  
  let messagecount = parseInt(args[0]); 
 
  if(isNaN(messagecount)) return message.channel.send(incorrectArgsEmbed)
  
  if(messagecount > 100){
    incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('You can only delete up to 100 messages at a time.')
        .setTimestamp();
       return message.channel.send(incorrectArgsEmbed)
      }else{
        if(messagecount < 2){
        incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('You have to delete at least 2 messages.')
        .setTimestamp();
        return message.channel.send(incorrectArgsEmbed)
        }
      }
    message.delete();
    message.channel.messages.fetch({limit: messagecount}).then(messages => message.channel.bulkDelete(messages, true));
    
    let successEmbed= new Discord.MessageEmbed() 
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Messages Cleared`)
        .addField(`Cleared ${messagecount} messages in`, message.channel)
        .setTimestamp();
        
      message.channel.send(successEmbed);
      let cid = logch.replace(/^<#(\d+)>$/, '$1');
      message.guild.channels.cache.get(cid).send(successEmbed)
}