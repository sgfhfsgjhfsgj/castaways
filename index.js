//=================IMPORT=================\\
const Discord = require('discord.js');

const client = new Discord.Client();

const config = require("./config.json")

const fs = require('fs');

const token = process.env['token']

client.commands = new Discord.Collection();

//KEEPING THE BOT ONLINE

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`[BPING] Listening at http://localhost:${port}`));


//=============COMMAND HANDLER=============\\

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Successfully loaded: ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

//==============EVENT HANDLER==============\\

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

//==================LOGIN==================\\


try{
client.login(token)
}catch(e){
  console.log(e)
}
