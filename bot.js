/**
 * A bot based on the following repo from 'y15':
 * https://gist.github.com/y21/a599ef74c8746341dbcbd32093a69eb8
*/

// load your credentials stored in a seperate file
var loginCreds = require('../Credentials/credentials.json');

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('LegendBot is ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content.toLowerCase() === '!ping') {
    // Send "pong" to the same channel
    message.channel.send('Pong!').catch((e) => { console.log(e); });
    console.log('Ping from: ' + message.member.user.username);
  }

  if (message.content.toLowerCase() === '!cmds' || message.content.toLowerCase() === '!help') {
    // Print all existing commands
    message.channel.send('Hey you! \nI only understand certain commands. Here is a list of them: \n"!ping" - you´ll see,\n "!cmds" - shows you a list of all commands,\n "!roles" - shows a List of all available roles,\n "!addRole:apex", "!addRole:cs" and "!addRole:rl" - those will add you the specific role \n').catch((e) => { console.log(e); });
  }

  if (message.content.toLowerCase() === '!roles') {
    // Print all existing roles
    message.channel.send('These are the available roles: \n- ApexPlayers \n- CS:GOPlayers \n- RocketLeague \n').catch((e) => { console.log(e); });
    //message.guild.roles.findAll
  }

  // TODO - Regex for all letters after '!'
  /* var letters = /^[a-zA-Z]+$/;
  if (message.content.toLowerCase() === '!'){
    console.log(message.member.user.username + " tried to get a non existing role - atleast on this server");
      
    // Used to get my own user id
    //console.log(message.member.user.id);
    client.users.get("316514645752020992").send(message.content);

    message.channel.send("I'm sorry " + message.member.user.username + "!\n Unfortunately there is no command/role like this yet... but I requested it from our admins :)\n").catch((e) => { console.log(e); });
    return;
  } */

  // Commands for getting roles //
  // -------------------------- //
  // APEX LEGENDS
  if (message.content.toLowerCase() === '!addrole:apex'){
    var role = message.guild.roles.find(role => role.name === "ApexPlayers");
    if(role === null){
      console.log(message.member.user.username + " tried to get a non existing role - atleast on this server");
      message.channel.send("Hm...it seems that I know this role but this server does not...").catch((e) => { console.log(e); });
      return;
    }
    var strpd_role = role.toString().replace(/\D/g, "");
    message.channel.send('You requested to be an ApexPlayer...').catch((e) => { console.log(e); });
    if(message.member.roles.has(strpd_role)){ // Check if member has role
      console.log(message.member.user.username + " already has the role: " + role.name);
      message.channel.send("NANI?!... you already are an ApexPlayer").catch((e) => { console.log(e); });
    } else {
      message.member.addRole(role);
      console.log(message.member.user.username + " added himself the role: " + role.name);
      message.channel.send("Have fun with your new role: " + message.member.user.username).catch((e) => { console.log(e); });
    }
  }

  // CS:GO
  if (message.content.toLowerCase() === '!addrole:cs'){
    var role = message.guild.roles.find(role => role.name === "CS:GOPlayers");
    if(role === null){
      console.log(message.member.user.username + " tried to get a non existing role - atleast on this server");
      message.channel.send("Hm...it seems that I know this role but this server does not...").catch((e) => { console.log(e); });
      return;
    }
    var strpd_role = role.toString().replace(/\D/g, "");
    message.channel.send('You requested to be a CS:GOPlayers...').catch((e) => { console.log(e); });
    if(message.member.roles.has(strpd_role)){ // Check if member has role
      console.log(message.member.user.username + " already has the role: " + role.name);
      message.channel.send("NANI?!... you already are a CS:GOPlayers").catch((e) => { console.log(e); });
    } else {
      message.member.addRole(role);
      console.log(message.member.user.username + " added himself the role: " + role.name);
      message.channel.send("Have fun with your new Role: " + message.member.user.username).catch((e) => { console.log(e); });
    }
  }

  // ROCKET LEAGUE
  if (message.content.toLowerCase() === '!addrole:rl'){
    var role = message.guild.roles.find(role => role.name === "RocketLeague");
    if(role === null){
      console.log(message.member.user.username + " tried to get a non existing role - atleast on this server");
      message.channel.send("Hm...it seems that I know this role but this server does not...").catch((e) => { console.log(e); });
      return;
    }
    var strpd_role = role.toString().replace(/\D/g, "");
    message.channel.send('You requested RocketLeague role...').catch((e) => { console.log(e); });
    if(message.member.roles.has(strpd_role)){ // Check if member has role
      console.log(message.member.user.username + " already has the role: " + role.name);
      message.channel.send("NANI?!... you already have the RocketLeague role").catch((e) => { console.log(e); });
    } else {
      message.member.addRole(role);
      console.log(message.member.user.username + " added himself the role: " + role.name);
      message.channel.send("Have fun with your new Role: " + message.member.user.username).catch((e) => { console.log(e); });
    }
  }

  // Commands for MP3 Snippets //
  // ------------------------- //
  // NICE NICE NICE
  if (message.content.toLowerCase() === '/nice') {
    // Voice only works in guilds
    if (!message.guild) return;

    message.member.voiceChannel.join().then(connection => {
      // You can play a file or a stream here:
      const dispatcher = connection.playFile('./SoundSnippets/NICENICENICENICE.mp3', { volume: 0.75 });
      dispatcher.on("end", end => {message.member.voiceChannel.leave();})
    }).catch(err => console.log(err));
  }

  // KEKW
  if (message.content.toLowerCase() === '/kekw') {
    if (!message.guild) return;

    message.member.voiceChannel.join().then(connection => {
      const dispatcher = connection.playFile('./SoundSnippets/KEKW.mp3', { volume: 0.75 });
      dispatcher.on("end", end => {message.member.voiceChannel.leave();})
    }).catch(err => console.log(err));
  }
});

client.on("guildMemberAdd", (member) => {
    let guild = member.guild; 
    let memberTag = member.user.tag;
    let name = member.user.username;
    let id = member.user.id;

    if(guild.systemChannel){
      /* guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
      .setTitle("A new user joined") // Calling method setTitle on constructor. 
      .setDescription(memberTag + " has joined the guild") // Setting embed description
      .setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
      .addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
      .setTimestamp() // Sets a timestamp at the end of the embed
      ); */
      guild.systemChannel.send("Hello <@" + id + ">, nice to meet you! \nCheck out the Commands I understand with '!cmds'. \nIf you want a Game-Specific-Role you can add it yourself. :) \nIf you need any help or if you have suggestions for improvement contact our Admin-Team. \n\nIn closing: When you enjoy your time here on the server, feel free to invite your friends!").catch((e) => { console.log(e); });
    }
  });

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(loginCreds.token);
