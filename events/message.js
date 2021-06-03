module.exports = (client, message) => {
  const config = require("../config.json")
const Enmap = require('enmap')
const Discord = require("discord.js")
const u = message.mentions.users.first() || message.author; 

if(message.author.bot) return;
if(!message.guild) return;

//Getting server settings

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
  

//EMBEDS

let nosetupEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`You haven't setup the bot!`)
        .setDescription(`Please type c!setup to start.`)
        .setTimestamp();
        
let missingPermissionsEmbed;

// ENMAPS //

if(client.devsettings.get(u.id, "dbclear") == "true") {
  client.devsettings.set(u.id, "false", "dbclear")
  client.serverSettings.delete(message.guild.id)
  client.serverSettings.set(message.guild.id, {
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
}
  if(!message.content.startsWith(prefix)) return;

//================Defining================\\
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
  const commandName = args.shift().toLowerCase();
  
//=============Command Handling=============\\

if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
  
  //Perms
  let o = client.devsettings.get(u.id, "override")
    
  if(o == "false") {
  
  if(command.help.permlevel == "BOT_OWNER" && message.author.id != config.OWNER_ID){
    
     missingPermissionsEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Insufficient Permissions!')
        .setDescription('Only the bot owner can use this command!')
        .setTimestamp();
    
     return message.channel.send(missingPermissionsEmbed)
  }
    if(command.help.permlevel == "SERVER_OWNER" && message.author.id != message.guild.owner.id) { 
      
      missingPermissionsEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Insufficient Permissions!')
        .setDescription('Only the server owner can use this command!')
        .setTimestamp();
      
      return message.channel.send(missingPermissionsEmbed)
    }
  
  if(command.help.permlevel != "SERVER_OWNER" && command.help.permlevel != "BOT_OWNER" && command.help.permlevel != "MEMBER") {
  if(!message.member.hasPermission(command.help.permlevel)) {
    
    missingPermissionsEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Insufficient Permissions!')
        .setDescription(`Only users with the \`\`\`${command.help.permlevel}\`\`\` permission can use this command!`)
        .setTimestamp();
    
    return message.channel.send(missingPermissionsEmbed)
  }
}
  
if(commandName != "setup" && commandName != "devtools" && logch == "Not set") return message.channel.send(nosetupEmbed)
}
    
    
  if(commandName !="settings") {
  let errEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('You have incorrect settings!')
        .setDescription("Please run the settings command and make sure that they are all valid.")
        .setTimestamp();
    if(!/^<#(\d+)>$/.test(logch) && logch != "Not set") return message.channel.send(errEmbed)
  }
  try{
  command.run(client, message, args);
  }catch(e){
  console.log(e)
}
}
