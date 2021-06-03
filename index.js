//=================IMPORT=================\\
const Discord = require('discord.js');

const client = new Discord.Client();

const config = require("./config.json")

const Enmap = require("enmap")

const fs = require('fs');

const token = process.env['token']

client.commands = new Discord.Collection();

//KEEPING THE BOT ONLINE

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`[BPING] Listening at http://localhost:${port}`));

//CONSOLE COLOURS

const Style = { base: [ "color: #fff", "background-color: #444", "padding: 2px 4px", "border-radius: 2px" ], warning: [ "color: #eee", "background-color: red" ], success: [ "background-color: green" ] }

//Music Shit

const { Player } = require("discord-player");

const player = new Player(client); client.player = player;

client.player.on("trackStart", (message, track) => {
  
  let playEmbed = new Discord.MessageEmbed() 
        .setColor("BLUE")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle('Now Playing')
        .setThumbnail(track.thumbnail)
        .setDescription(`:arrow_forward: ${track.title} || ${track.author}`)
        .addField(`Duration`, track.duration)
        .setTimestamp();
  
  message.channel.send(playEmbed)
})

//=============COMMAND HANDLER=============\\

fs.readdir("./commands/NormalCMDS", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/NormalCMDS/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`%c[Normal] Successfully loaded: ${commandName}`, Style.success);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

fs.readdir("./commands/StaffCMDS", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/StaffCMDS/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`%c[Staff] Successfully loaded: ${commandName}`, Style.success);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

fs.readdir("./commands/DevCMDS", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/DevCMDS/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`%c[Dev] Successfully loaded: ${commandName}`, Style.success);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

fs.readdir("./commands/MusicCMDS", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/MusicCMDS/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`%c[Music] Successfully loaded: ${commandName}`, Style.success);
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

//==================ENMAPS==================\\

client.devsettings = new Enmap({
  name: "devsettings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
  override: "false",
  dbclear: "false"
  }
});
  
  client.serverSettings = new Enmap({
  name: 'servset',
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
  prefix: "c!",
  logchannel: "Not set",
  joinrole: "Not set",
  joinchannel: "Not set",
  joinmsg: "Not set",
  joindm: "Not set",
  leavemsg: "Not set",
  leavechannel: "Not set",
  adminrole: "Not set",
  modrole: "Not set"
  }
  });

//==================LOGIN==================\\


try{
client.login(token)
}catch(e){
  console.log(e)
}