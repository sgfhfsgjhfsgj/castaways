module.exports = async (client, member) => {

const Discord = require("discord.js")
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
  
  let jm1;
  let jm2;
  console.log(jmsg)
    
  if(jmsg != "Not set") {
    jm1 = await jmsg.replace(/(?<![A-Z]){member}(?![A-Z])/gi, member)
    jm2 = await jm1.replace(/(?<![A-Z]){guild}(?![A-Z])/gi, member.guild.name)
  }
let maddEmbed = new Discord.MessageEmbed() 
        .setColor('BLUE')
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setTitle(member.guild.name)
        .setDescription(jm2)
        .setFooter('Joined At', member.user.joinedAt)
        .setTimestamp();
        
  let channel;
    if(jch != "Not set"){
  let cid = jch.replace(/^<#(\d+)>$/, '$1');
  channel = member.guild.channels.cache.get(cid)
    }
  
  if(jch && jmsg != "Not set") { 
    channel.send(maddEmbed);
  }
  
  if(jrl != "Not set") {
    try{
  let rid = jrl.replace(/^<@&(\d+)>$/, '$1');
  member.roles.add(rid)
    }catch(e){
      let errEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle('Unexpected Error!')
        .addField('Error:',e.message)
        .addField('Make sure the bot has a role higher than the role your trying to assign', 'Maybe run the settings command and check if your join role is setup properly.')
        .setTimestamp();
        message.channel.send(errEmbed)
    }
  }
  
  if(jdm == "true"){
    member.send(maddEmbed)
 }
}