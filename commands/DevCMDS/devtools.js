module.exports.help = {
  name: 'devtools',
  description: 'A command available only to the bot owner. It allows control over developer tools used for testing.',
  usage: "{setting} <true/false>",
  permlevel: "BOT_OWNER",
  category: "dev"
}

module.exports.run = (client, message, args) => {
const config = require("../../config.json")
const Discord = require("discord.js")
const Enmap = require("enmap")
const u = message.mentions.users.first() || message.author;


// EMBEDS //
        
  const enabledEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(` Dev Settings`)
        .addField(`Successfully enabled!`, "This only applies to the user tagged, or the user running the command.")
        .setTimestamp();
        
  const disabledEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Dev Settings`)
        .addField(`Successfully disabled!`, "This only applies to the user tagged, or the user running the command.")
        .setTimestamp();
        
  const failEmbed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(` Dev Settings`)
        .addField(`Setting not updated due to error`, 'Check the console!')
        .setTimestamp();
        
  const incorrectArgsEmbed = new Discord.MessageEmbed() 
        .setColor("RED")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Incorrect Syntax!')
        .setDescription('That isnt one of our settings. Run the settings command alone to see your options.')
        .setTimestamp();
        
  
  // SHOW OPTIONS //
  let a = client.devsettings.get(u.id)
  
  if(!args[0]) {
    let configProps = Object.keys(a).map(prop => {

return `${prop} : ${a[prop]}`;

});

message.channel.send(`The following are the users current configuration:

\`\`\`${configProps.join("\n")}\`\`\``);


    return;
  }
  
  // AVAILABLE OPTIONS //
  
  const [prop, ...value] = args;
  
if(!value)
  
if(!client.devsettings.has(u.id, prop)) {

return message.channel.send(incorrectArgsEmbed)

}

client.devsettings.set(u.id, value.join(" "), prop);

// We can confirm everything's done to the client.

let successEmbed= new Discord.MessageEmbed() 
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`${prop} has been changed!`)
        .addField(`New ${prop}:`,value.join(" "))
        .setTimestamp();
        
      message.channel.send(successEmbed)
      message.author.send(successEmbed)
  
  
}