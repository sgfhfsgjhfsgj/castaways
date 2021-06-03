module.exports = async (client, member) => {

const Discord = require("discord.js");
const setkey = member.guild.id;
let a = await client.serverSettings.get(setkey);


  let prefix = a.prefix;
  let jmsg = a.joinmsg
  let jrl = a.joinrole
  let jch = a.joinchannel
  let jdm = a.joindm
  let logch = a.logchannel
  let lmsg = a.leavemsg
  let lch = a.leavechannel
  
  let lm1;
  let lm2;

    
  if(lmsg != "Not set") {
  lm1 = await lmsg.replace(/(?<![A-Z]){member}(?![A-Z])/gi, member.user.tag)
  lm2 = await lm1.replace(/(?<![A-Z]){guild}(?![A-Z])/gi, member.guild.name)
  }
  let maddEmbed = new Discord.MessageEmbed() 
        .setColor('BLUE')
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setTitle(member.guild.name)
        .setDescription(lm2)
        .setFooter('Joined At', member.user.joinedAt)
        .setTimestamp();
  let channel;
    if(lch != "Not set"){
  let cid = lch.replace(/^<#(\d+)>$/, '$1');
  channel = member.guild.channels.cache.get(cid)
    }
  
  if(lch && lmsg != "Not set") { 
    channel.send(maddEmbed);
  }
 }
