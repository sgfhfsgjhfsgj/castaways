module.exports.help = {
  name: 'reload', 	
  description: 'Reloads a specifed command',
  usage: "<commandName>",
  permlevel: "BOT_OWNER",
  category: "dev"
}
module.exports.run = (client, message, args) => {
  
const fs = require('fs');
  		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName);

		if (!command) {
			return message.channel.send(`There is no command with name \`${commandName}\`, ${message.author}!`);
		}
		
	  const commandFolders = fs.readdirSync('./commands'); 
	  
	  const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.help.name}.js`));
    
    
    delete require.cache[require.resolve(`../${folderName}/${command.help.name}.js`)];

try {
	const newCommand = require(`../${folderName}/${command.help.name}.js`);
	
	message.client.commands.set(newCommand.help.name, newCommand);
	
	
	message.channel.send(`Command \`${newCommand.help.name}\` was reloaded!`);
} catch (error) {
	console.error(error);
	message.channel.send(`There was an error while reloading a command \`${command.help.name}\`:\n\`${error.message}\``);
}
}