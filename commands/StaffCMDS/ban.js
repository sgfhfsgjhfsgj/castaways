module.exports.help = {
  name: 'ban',
  description: 'A command used to ban members from a server',
  usage: "<user> {reason}",
  permlevel: "BAN_MEMBERS",
  category: "staff"
}
module.exports.run = (client,message,args) => {
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
        
  const incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('You need to mention someone to ban!')
        .setTimestamp();
  
  //REST OF CODE
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  let reason = args.slice(0).join(" ");
  
  if(!member) return message.channel.send(incorrectArgsEmbed);
  
  if(!args[1]){
    reason = "No reason specified!";
  }
  
  const banembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Banned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()
        
        member.ban({ reason: reason })
        message.channel.send(banembed)
        let cid = logch.replace(/^<#(\d+)>$/, '$1');
      message.guild.channels.cache.get(cid).send(banembed)
}