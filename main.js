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
    var date = new Date().toLocaleString();
    console.log('LegendBot is ready! - ' + date);
    // Set a game activity for the bot
    client.user.setActivity("LegendBot | !help");
});

// Create an event listener for messages
client.on('message', message => {
    var lowerCaseMessage = message.content.toLowerCase();
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

    // If the message is "ping"
    if (message.content.toLowerCase() === '!ping') {
        // Send "pong" to the same channel
        message.channel.send('Pong!').catch((e) => { console.log(e); });
        console.log('Ping from: ' + message.member.user.username);
    }

    if (message.content.toLowerCase() === '!cmds' || message.content.toLowerCase() === '!help') {
        var channelLink = message.member.guild.channels.find(channel => channel.name === 'bot-commands');
        // Print all existing commands
        message.channel.send('Hey you! \nI only understand certain commands. Here is a list of them: \n-> "**!ping**" - Pong? \n-> "**!roles**" - shows a list of all available roles \n-> "**!sounds**" - shows a list of all soundsnippets \nGo ahead and try it yourself under the channel ' + channelLink + ' \n\n *Of course you can remove a role yourself using the following pattern:* "**!rmRole:apex**"').catch((e) => { console.log(e); });
    }

    var arrayOfRoles = { ApexPlayers: '!addRole:apex', ValorantPlayers: '!addRole:valorant', MinecraftPlayers: '!addRole:minecraft', 'CS:GOPlayers': '!addRole:cs', RocketLeague: '!addRole:rl', WarzonePlayers: '!addRole:warzone' };
    if (message.content.toLowerCase() === '!roles') {
        // Print all existing roles
        message.channel.send('These are the available roles: \n- **ApexPlayers** | !addRole:apex \n- **ValorantPlayers** | !addRole:valorant \n- **MinecraftPlayers** | !addRole:minecraft \n- **CS:GOPlayers** | !addRole:cs \n- **RocketLeague** | !addRole:rl \n- **WarzonePlayers** | !addRole:warzone \n').catch((e) => { console.log(e); });
        //message.guild.roles.findAll
    }

    // Function for getting roles //
    // -------------------------- //
    function addingRole(givenRoleName) {
        // Filter the rolename of the whole !addrole request out 
        var roleName = givenRoleName.split(':', 2);

        // Cycle through the predefined role array
        for (var key in arrayOfRoles) {
            // If the given role name matches an entry of the predefined role array it will further execute
            if (givenRoleName === arrayOfRoles[key].toLowerCase()) {
                // Get role id from the discord guild
                var role = message.guild.roles.find(role => role.name === key);

                if (role === null) {
                    console.log(message.member.user.username + ' tried to get a non existing role (' + roleName[1] + ') - atleast on this server');
                    message.channel.send('Hm...it seems that I know this role but this server does not...').catch((e) => { console.log(e); });
                    return;
                }

                message.channel.send('You requested the role: ' + role.name + '...').catch((e) => { console.log(e); });
                var strpd_role = role.toString().replace(/\D/g, "");

                // Check if member has role
                if (message.member.roles.has(strpd_role)) {
                    console.log(message.member.user.username + ' already has the role: ' + role.name);
                    message.channel.send('NANI?!... you already have the role: ' + role.name).catch((e) => { console.log(e); });
                } else {
                    message.member.addRole(role);
                    console.log(message.member.user.username + ' added himself the role: ' + role.name);
                    message.channel.send('Have fun with your new role ' + message.member.user.username + '! :)').catch((e) => { console.log(e); });
                }
            }
        }
    }
    // Listening for the addrole command
    if (message.content.toLowerCase().startsWith('!addrole:')) {
        try {
            addingRole(message.content.toLowerCase());
        } catch (error) {
            console.log('Unknown input for adding role: ' + message);
        }
    }

    // Removing Roles //
    // -------------- //
    if (message.content.toLowerCase() === '!rmrole:apex') {
        var role = message.guild.roles.find(role => role.name === "ApexPlayers");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role ApexPlayers but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'ApexPlayer' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    if (message.content.toLowerCase() === '!rmrole:cs') {
        var role = message.guild.roles.find(role => role.name === "CS:GOPlayers");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role CS:GOPlayers but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'CS:GOPlayers' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    if (message.content.toLowerCase() === '!rmrole:rl') {
        var role = message.guild.roles.find(role => role.name === "RocketLeague");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role RocketLeague but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'RocketLeague' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    if (message.content.toLowerCase() === '!rmrole:warzone') {
        var role = message.guild.roles.find(role => role.name === "WarzonePlayers");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role WarzonePlayer but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'WarzonePlayers' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    if (message.content.toLowerCase() === '!rmrole:valorant') {
        var role = message.guild.roles.find(role => role.name === "ValorantPlayers");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role ValorantPlayer but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'ValorantPlayers' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    if (message.content.toLowerCase() === '!rmrole:minecraft') {
        var role = message.guild.roles.find(role => role.name === "MinecraftPlayers");
        if (role === null) {
            console.log(message.member.user.username + " tried to remove the role MinecraftPlayer but failed somehow!");
            message.channel.send("This server doesn't know this role...").catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");
        message.channel.send('Removing role...').catch((e) => { console.log(e); });
        if (message.member.roles.has(strpd_role)) { // Check if member has role
            message.member.removeRole(role);
            console.log(message.member.user.username + " removed himself the role: " + role.name);
            message.channel.send("Removed the role 'MinecraftPlayers' from you.\n*...sad bot noises...*").catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + " tried to remove a role he doesn't own: " + role.name);
            message.channel.send("You can't remove a role you don't own!").catch((e) => { console.log(e); });
        }
    }

    // Display all available sound snippets
    if (message.content.toLowerCase() === '!sounds') {
        message.channel.send('Try playing a snippet by typing "**/**_filename_" \nHere are the available sounds:\n').catch((e) => { console.log(e); });
        var sounds = [];
        // Iterate over snippets
        fs.readdir(soundsFolder, (err, files) => {
            files.forEach(file => {
                sounds.push('- ' + file.split(".", 1));
            });
            message.channel.send(sounds).catch((e) => { console.log(e); });
            message.channel.send('_May I suggest you to try_ **/click**').catch((e) => { console.log(e); });
        });
    }

    // Routine for MP3 Snippets //
    // ------------------------- //
    // REMEMBER adding 1s of silence at the end of each file, because the bot is leaving the channel too early
    const soundsFolder = './SoundSnippets/';
    const fs = require('fs');
    if (message.content.startsWith('/')) {
        // Voice only works in guilds
        if (!message.guild) return;
        try {
            // Remove the / from the message and add the .mp3 ending
            var msg = message.content.toLowerCase().concat('.mp3').slice(1);
            var pathToFile = soundsFolder.concat(msg);
            var vc = message.member.voiceChannel;

            // Iterate over snippets
            fs.readdir(soundsFolder, (err, files) => {
                files.forEach(file => {
                    if (file === msg) {
                        vc.join().then(connection => {
                            const dispatcher = connection.playFile(pathToFile, { volume: 0.5 });
                            dispatcher.on('end', end => { vc.leave(); })
                        }).catch(err => console.log(err));
                    }
                });
            });
        } catch (error) {
            console.log('Unknown input for sound snippets: ' + message);
        }
    }
});


// Greet all new members
client.on('guildMemberAdd', (member) => {
    var guild = member.guild;
    var memberTag = member.user.tag;
    var name = member.user.username;
    var id = member.user.id;

    if (guild.systemChannel) {
        /* guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
        .setTitle("A new user joined") // Calling method setTitle on constructor. 
        .setDescription(memberTag + " has joined the guild") // Setting embed description
        .setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
        .addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
        .setTimestamp() // Sets a timestamp at the end of the embed
        ); */

        var channelHow = guild.channels.find(channel => channel.name === 'how-to');
        var channelBot = guild.channels.find(channel => channel.name === 'bot-commands');
        var roleLink = guild.roles.find(channel => channel.name === 'Admin');
        guild.systemChannel.send('Hello <@' + id + '>, nice to meet you! \nCheck out the Commands I understand with "!help". \nIf you want **Game-Specific-Roles** you can **add them yourself**. \nTo learn more about all this futuristic stuff checkout: ' + channelHow + ' \nAs well as the **pinned messages** in each of our textchannels, these provide you with all kinds of useful informations. \nGo ahead and **try it out** under the channel: ' + channelBot + '\nIf you need any help or if you have **suggestions for improvement** contact our ' + roleLink + '-Team. \n\nIn closing: When you enjoy your time here on the server, **feel free to invite your friends**!').catch((e) => { console.log(e); });
    }
});

// Log our bot in by using the token from https://discordapp.com/developers/applications/me
client.login(loginCreds.token);