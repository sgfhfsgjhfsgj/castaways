module.exports.help = {
  name: 'kick',
  description: 'A command used to kick members from a server',
  usage: "<user> {reason}",
  permlevel: "KICK_MEMBERS",
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
        .setDescription('You need to mention someone to kick!')
        .setTimestamp();
  
  //REST OF CODE
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  let reason = args.slice(0).join(" ");
  
  if(!member) return message.channel.send(incorrectArgsEmbed);
  
  if(!args[1]){
    reason = "No reason specified!";
  }
  
  const kickembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()
        
        member.kick({ reason: reason })
        message.channel.send(kickembed)
        let cid = logch.replace(/^<#(\d+)>$/, '$1');
      message.guild.channels.cache.get(cid).send(kickembed)
}