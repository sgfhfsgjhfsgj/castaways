module.exports = (client, message) => {
const config = require("../config.json")
const Discord = require("discord.js")

if(message.author.bot) return;
if(!message.guild) return;

if(!message.content.startsWith(config.prefix)) return;

//================Defining================\\
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
  const commandName = args.shift().toLowerCase();
  
//=============Command Handling=============\\

if (!client.commands.has(commandName)) return;
const command = client.commands.get(commandName);
  
try{
  command.run(client, message, args);
  }catch(e){
  console.log(e)
}
}
