module.exports.help = {
  name: 'help', 	
  description: 'A command that lists all others, its usage, permission level etc.',
  usage: "{commandName}",
  permlevel: "MEMBER",
  category: "member"
}
module.exports.run = (client, message, args) => {
  const data = [];
  const mcatdata = [];
  const scatdata = [];
  const mucatdata = [];
  const dcatdata = [];
	const { commands } = message.client;
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
  let adminr = a.adminrole
  let modr = a.modrole
  
  //Display help commands
  
  if (!args.length) {
    
  commands.forEach(cmd => {
    
    if(cmd.help.category == "dev"){
    return dcatdata.push(`${cmd.help.name}`);
  }else{
    if(cmd.help.category == "staff"){
    return scatdata.push(`${cmd.help.name}`);
    }else{
    if(cmd.help.category == "member"){
    return mcatdata.push(`${cmd.help.name}`);
    }else{
    if(cmd.help.category == "music"){
    return mucatdata.push(`${cmd.help.name}`);
    }
   }
   }
  }

  /*case "music":
    muscatdata.push(commands.map(c => commands.help.name).join('\n'))
    break;*/
  })
  
  
  const helplistEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle('Here\'s a list of all my commands:')
        .addField("Member Commands", mcatdata, { split: true }, true)
        .addField("Music Commands", mucatdata, { split: true }, true)
        .addField("Staff Commands", scatdata, { split: true }, true)
        .addField("Developer Commands", dcatdata, { split: true }, true)
        .setFooter(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
        .setTimestamp();

	return message.author.send(helplistEmbed).then(() => {
      
      if (message.channel.type === 'dm') return;
      
      message.reply('I\'ve sent you a DM with all my commands!');
      
      
    }).catch(error => { 
      console.error(`Could not send help DM to ${message.author.tag}.\n`, error); 			
      
      message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
    }); 
  }

const name = args[0].toLowerCase();
const command = commands.get(name);

if (!command) {
  let invalidcmdEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle('That isnt a command!')
        .setDescription('Run the help command alone to see your options.')
        .setTimestamp();

	return message.channel.send(invalidcmdEmbed);
}

data.push(`**Name:** ${command.help.name}\n`);

if (command.help.description) data.push(`**Description:** ${command.help.description}\n`);

if (command.help.usage) {
  if(command.help.usage == "None"){
    data.push(`**Usage:** ${prefix}${command.help.name}\n`);
  }else{
  data.push(`**Usage:** ${prefix}${command.help.name} ${command.help.usage}\n`);
  }
}

data.push(`**Category:** ${command.help.category}\n`);

if(command.help.permlevel){
  data.push(`**Permission Required:** ${command.help.permlevel}\n`);
}

const helpcmdEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle(`Command Info:`)
        .setDescription(data, { split: true })
        .setFooter(`Anything inside <> is required. Anything inside {} is optional`)
        .setTimestamp();


message.channel.send(helpcmdEmbed);
}