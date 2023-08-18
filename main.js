/**
 * A bot based on the following repo from 'y15':
 * https://gist.github.com/y21/a599ef74c8746341dbcbd32093a69eb8
 */

// load your credentials stored in a separate file
var loginCreds = require('../Credentials/credentials.json');

// Import the discord.js module
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

// Get all intents and create an instance of a Discord client
//const client = new Client({ ws: { intents: GatewayIntentBits.ALL } });
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    var date = new Date();
    console.log('LegendBot is ready! - ' + date.toLocaleString());

    // Set a game activity for the bot
    client.user.setActivity("LegendBot | !help");
});

// The keys in this map represent the roles defined on your discord server
var arrayOfRoles = { JustChatting: '!addRole:jc', ApexPlayers: '!addRole:apex', ValorantPlayers: '!addRole:valorant', AmongUsPlayers: '!addRole:amongus', MinecraftPlayers: '!addRole:minecraft', 'CS:GOPlayers': '!addRole:cs', RocketLeague: '!addRole:rl', ValheimPlayers: '!addrole:valheim', NewWorldPlayers: '!addRole:newworld', AoE_Players: '!addRole:aoe', OverwatchPlayers: '!addRole:ow', HuntPlayers: '!addRole:hunt', Dota2Players: '!addRole:dota', SpellBreakers: '!addRole:spell', WarzonePlayers: '!addRole:warzone' };


// Create an event listener for messages
client.on("messageCreate", async message => {

    lowerCaseMessage = message.cleanContent.toLowerCase();

    try {
        var channelBotCommands = message.member.guild.channels.cache.find(channel => channel.name === '🤖bot-commands');
    } catch (error) {
        console.log('Error getting the bot-commands Channel: ' + error);
        console.log('Setting the channel ID manually');
        var channelBotCommands = '689909990160334910'
    }

    // If the origin of the message is the bot-commands channel or the message author is not our bot or the message author is an admin - do nothing
    if (lowerCaseMessage.startsWith('!')) {
        if (message.channel.id == channelBotCommands || message.author == '561275886192820224' || message.member.permissions.has("ADMINISTRATOR")) {
            console.log('This one has massive powers!');
        } else { // Remind the user to use the correct channel
            message.reply({ content: 'please use our <#' + channelBotCommands + '> channel to keep this one tidy.' });
            return;
        }
    }

    if (lowerCaseMessage.startsWith('/')) {
        if (message.channel.id == channelBotCommands || message.author == '561275886192820224' || message.member.permissions.has("ADMINISTRATOR")) {
            console.log('This one has massive powers!');
        } else { // Remind the user to use the correct channel
            message.reply({ content: 'please use our <#' + channelBotCommands + '> channel to keep this one tidy.' });
            return;
        }
    }

    // Returns a list of new members of the last two weeks
    if (lowerCaseMessage === '!newbies') {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            console.log('Admin looked for newbs!');

            var list = client.guilds.cache.get('554337259315265538');

            var date = new Date();
            var today = date.getTime();
            var lastTwoWeeks = (today - 1209600000);
            list.members.cache.forEach(member => {
                // console.log('User: ' + member.user.username + ' Joined at: ' + member.joinedAt.getTime());
                try {
                    if (member.joinedAt.getTime() >= lastTwoWeeks) {
                        console.log(member.user.username);
                        message.channel.send({ content: 'New user/s: ' + member.user.username }).catch((e) => { console.log(e); });
                    }
                } catch (error) {
                    console.log('getTime failed - in !newbies command!');
                }
            });
        } else { // Remind the user to use the correct channel
            message.reply({ content: 'This command is for admins only - sorry :*' });
            return;
        }
    }

    // If the message is "ping"
    if (lowerCaseMessage === '!ping') {
        // Send "pong" to the same channel
        message.channel.send({ content: 'Pong!' }).catch((e) => { console.log(e); });
        console.log('Ping from: ' + message.member.user.username);
    }

    if (lowerCaseMessage === '!cmds' || lowerCaseMessage === '!help') {
        var channelLink = message.member.guild.channels.cache.find(channel => channel.name === '🤖bot-commands');
        // Print all existing commands
        message.reply({ content: 'Hey you! \nI only understand certain commands. Here is a list of them: \n-> "**!roles**" - shows a list of all available roles \n-> "**!sounds**" - shows a list of all soundsnippets \nGo ahead and try it yourself under the channel <#' + channelLink + '>' }).catch((e) => { console.log(e); });
    }

    if (lowerCaseMessage === '!roles') {
        // Print all existing roles
        message.channel.send({ content: 'These are the available roles: \n **!addRole:jc** | JustChatting \n **!addRole:apex** | ApexPlayers \n **!addRole:valorant** | ValorantPlayers \n **!addRole:amongus** | AmongUsPlayers \n **!addRole:minecraft** | MinecraftPlayers \n **!addRole:cs** | CS:GOPlayers \n **!addRole:rl** | RocketLeague \n **!addRole:valheim** | Valheim \n\n*Of course you can remove a role yourself using the following pattern:* "**!rmRole:apex**"' }).catch((e) => { console.log(e); });
        //message.guild.roles.findAll
    }


    // Function for getting roles //
    // -------------------------- //
    function addingRole(roleToAdd) {
        // Filter the rolename of the whole !addrole request out
        var roleName = roleToAdd.split(':', 2);
        var role = null;
        // Cycle through the predefined role array
        for (var key in arrayOfRoles) {
            // If the given role name matches an entry of the predefined role array it will further execute
            if (roleToAdd === arrayOfRoles[key].toLowerCase()) {
                // Get role id from the discord guild
                var role = message.guild.roles.cache.find(role => role.name === key);

                if (role === null) {
                    console.log(message.member.user.username + ' tried to get a non existing role (' + roleName[1] + ') - atleast on this server');
                    var adminRoleLink = guild.roles.cache.find(channel => channel.name === 'Admin');
                    message.reply({ content: 'Hm...it seems that I know this role but this server does not... ' + adminRoleLink + '-Team haaalp!' }).catch((e) => { console.log(e); });
                    return;
                }

                message.channel.send({ content: 'You requested the role: ' + role.name + '...' }).catch((e) => { console.log(e); });
                var strpd_role = role.toString().replace(/\D/g, "");

                // Check if member has role
                if (message.member.roles.cache.has(strpd_role)) {
                    console.log(message.member.user.username + ' already has the role: ' + role.name);
                    message.reply({ content: 'NANI?!... you already have the role: ' + role.name }).catch((e) => { console.log(e); });
                } else {
                    message.member.roles.add(role);
                    console.log(message.member.user.username + ' added himself the role: ' + role.name);
                    message.reply({ content: 'Have fun with your new role! :)' }).catch((e) => { console.log(e); });
                }
            }
        }
    }

    // Listening for the addrole command
    if (lowerCaseMessage.startsWith('!addrole:')) {
        try {
            addingRole(lowerCaseMessage);
        } catch (error) {
            console.log('Unknown input for adding role: ' + message);
        }
    }


    // Function for removing roles //
    // -------------------------- //
    function removingRole(roleToRemove) {
        // Filter the rolename of the whole !rmrole request out
        var roleName = roleToRemove.split(':', 2);
        var role = null;
        // Cycle through the predefined role array
        for (var key in arrayOfRoles) {
            // When removing a role we can also use our predefined role array. But this time we need to split the vlaue field and check for accordance.
            var arrayKeySplit = arrayOfRoles[key].split(':', 2);
            // If the given role name matches an entry of the predefined role array it will further execute
            if (roleName[1] === arrayKeySplit[1].toLowerCase()) {
                // Get role id from the discord guild
                role = message.guild.roles.cache.find(role => role.name === key);
            }
        }
        if (role === null) {
            console.log(message.member.user.username + ' tried to remove the role >' + roleName[1] + '< but failed somehow!');
            message.reply({ content: 'This server doesn\'t know this role...' }).catch((e) => { console.log(e); });
            return;
        }
        var strpd_role = role.toString().replace(/\D/g, "");

        // Check if member has role
        if (message.member.roles.cache.has(strpd_role)) {
            message.member.roles.remove(role);
            console.log(message.member.user.username + ' removed himself the role: ' + role.name);
            message.reply({ content: 'I removed the role ' + role.name + ' from you.\n*...sad bot noises...*' }).catch((e) => { console.log(e); });
        } else {
            console.log(message.member.user.username + ' tried to remove a role he doesn\'t own: ' + role.name);
            message.reply({ content: 'You can\'t remove a role you don\'t own!' }).catch((e) => { console.log(e); });
        }
    }

    // Listening for the rmrole command
    if (lowerCaseMessage.startsWith('!rmrole:')) {
        try {
            removingRole(lowerCaseMessage);
        } catch (error) {
            console.log('Unknown input for removing role: ' + message);
        }
    }


    // Routine for MP3 Snippets //
    // ------------------------- //
    // REMEMBER adding 1s of silence at the end of each file, because the bot is leaving the channel too early
    const soundsFolder = './SoundSnippets/';
    const fs = require('fs');
    // Listen for messages
    if (message.cleanContent.startsWith('/')) {
        // Voice only works in guilds
        if (!message.guild) return;

        try {
            // Check if the user is in a voice channel
            var vc = message.member.voice.channel;
            if (!vc) {
                message.reply('You need to be in a voice channel to use this command.');
                return;
            }

            // Join the user's voice channel
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            // Listen for errors
            connection.on('error', error => {
                console.error(error);
            });

            // Remove the / from the message and add the .mp3 ending
            var concatMsg = lowerCaseMessage.concat('.mp3').slice(1);
            var pathToFile = soundsFolder.concat(concatMsg);

            // Iterate over snippets
            const files = await fs.promises.readdir(soundsFolder);
            for await (const file of files) {
                if (file === concatMsg) {
                    // Listen for the ready event
                    connection.on('ready', () => {
                        console.log(`Joined ${message.member.voice.channel.name} voice channel!`);

                        // Create a new audio player
                        const player = createAudioPlayer();
                        // Create a new audio resource from the file
                        const resource = createAudioResource(pathToFile);
                        // Play the audio resource
                        player.play(resource);
                        // Subscribe the audio player to the connection
                        connection.subscribe(player);

                        // Listen for errors on the player
                        player.on('error', error => {
                            console.error(error);
                        });

                        player.on('stateChange', (oldState, newState) => {
                            console.log(`State change: ${oldState.status} => ${newState.status}`);
                            if (newState.status === 'idle') {
                                console.log('Audio playback finished.');
                                setTimeout(() => {
                                    connection.destroy();
                                }, 2000);
                            }
                        });
                    });
                }
            }
        } catch (error) {
            console.log('Unknown input for sound snippets: ' + message.cleanContent);
        }
    }

    // Display all available sound snippets
    if (lowerCaseMessage === '!sounds') {
        var sounds = [];
        // Iterate over snippets
        fs.readdir(soundsFolder, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach(file => {
                sounds.push('- ' + file.split(".")[0]); // Corrected this line to split properly
            });

            const embed = {
                title: 'Available Sounds',
                description: 'Try playing a snippet by typing /**_filename_** \nHere are the available sounds:\n' + sounds.join('\n'),
            };

            message.reply({ embeds: [embed] })
                .then(() => {
                    message.channel.send('_May I suggest you to try_ /**click**');
                })
                .catch((e) => {
                    console.error(e);
                });
        });
    }

    // Prepared message for role reactions
    // Check for privileges - only admins should be able to trigger this message
    if (lowerCaseMessage === '!react') {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            console.log('The force is strong in this one!');

            const emojiJC = message.guild.emojis.cache.find(emoji => emoji.name === 'justchatting');
            const emojiApex = message.guild.emojis.cache.find(emoji => emoji.name === 'apex');
            const emojiCS = message.guild.emojis.cache.find(emoji => emoji.name === 'csgo');
            const emojiValorant = message.guild.emojis.cache.find(emoji => emoji.name === 'valorant');
            const emojiAmongUs = message.guild.emojis.cache.find(emoji => emoji.name === 'amongus');
            const emojiMinecraft = message.guild.emojis.cache.find(emoji => emoji.name === 'minecraft');
            const emojiRocketLeague = message.guild.emojis.cache.find(emoji => emoji.name === 'rocketleague');
            const emojiValheim = message.guild.emojis.cache.find(emoji => emoji.name === 'valheim');
            const emojiNewWorld = message.guild.emojis.cache.find(emoji => emoji.name === 'newWorld');
            const emojiAoE = message.guild.emojis.cache.find(emoji => emoji.name === 'aoe');
            const emojiOW = message.guild.emojis.cache.find(emoji => emoji.name === 'ow');
            const emojiHunt = message.guild.emojis.cache.find(emoji => emoji.name === 'huntshowdown');
            const emojiDota = message.guild.emojis.cache.find(emoji => emoji.name === 'dota');

            try {
                message.channel.send({ content: '**Um dir eine spiel spezifische Rolle hinzuzufügen, reagiere einfach mit dem entsprechenden Emoji.** \n**For adding yourself a game specific role, simply react with the corresponding emoji.** \n' }).then(initMessage => {
                    initMessage.react(emojiJC);
                    initMessage.react(emojiApex);
                    initMessage.react(emojiCS);
                    initMessage.react(emojiValorant);
                    initMessage.react(emojiAmongUs);
                    initMessage.react(emojiMinecraft);
                    initMessage.react(emojiRocketLeague);
                    initMessage.react(emojiValheim);
                    initMessage.react(emojiNewWorld);
                    initMessage.react(emojiAoE);
                    initMessage.react(emojiOW);
                    initMessage.react(emojiHunt);
                    initMessage.react(emojiDota);
                });
            } catch (error) {
                console.log(`Error occurred while reacting to message: ${error}`);
                message.channel.send('There was an error reacting with emojis!');
            }
        } else {
            message.channel.send('You do not have permissions to use this command!');
        }
    }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // Function for getting reaction roles //
    // -------------------------- //
    function addReactionRole(roleToAdd, reaction, user) {
        // Filter the rolename of the whole !addrole request out
        var roleName = roleToAdd.split(':', 2);
        var role = null;
        // Cycle through the predefined role array
        for (var key in arrayOfRoles) {
            // If the given role name matches an entry of the predefined role array it will further execute
            if (roleToAdd === arrayOfRoles[key].toLowerCase()) {
                // Get role id from the discord guild
                var role = reaction.message.guild.roles.cache.find(role => role.name === key);

                if (role === null) {
                    console.log(reaction.message.guild.members.cache.get(user.id).displayName + ' tried to get a non existing role (' + roleName[1] + ') - at least on this server');
                    return;
                } else {
                    var reactionMember = reaction.message.guild.members.cache.get(user.id);
                    if (user.id === '561275886192820224') {
                        console.log(user.username + ' is excluded from getting the role: ' + role);
                    } else {
                        reactionMember.roles.add(role);
                        console.log(user.username + ' added himself the role: ' + role.name);
                    }
                }
            }
        }
    }

    // When we receive a reaction we check if the reaction is partial or not
    // How-To Channel
    const channelHow = reaction.message.guild.channels.cache.find(channel => channel.name === '❔how-to');
    if (reaction.message.channel.id === channelHow.id) {
        // console.log('Listening on (add) reactions in the correct channel');
        try {
            await reaction.fetch();
            if (reaction.emoji.name === 'apex') {
                addReactionRole('!addrole:apex', reaction, user);
            } else if (reaction.emoji.name === 'justchatting') {
                addReactionRole('!addrole:jc', reaction, user);
            } else if (reaction.emoji.name === 'csgo') {
                addReactionRole('!addrole:cs', reaction, user);
            } else if (reaction.emoji.name === 'valorant') {
                addReactionRole('!addrole:valorant', reaction, user);
            } else if (reaction.emoji.name === 'amongus') {
                addReactionRole('!addrole:amongus', reaction, user);
            } else if (reaction.emoji.name === 'minecraft') {
                addReactionRole('!addrole:minecraft', reaction, user);
            } else if (reaction.emoji.name === 'rocketleague') {
                addReactionRole('!addrole:rl', reaction, user);
            } else if (reaction.emoji.name === 'valheim') {
                addReactionRole('!addrole:valheim', reaction, user);
            } else if (reaction.emoji.name === 'newWorld') {
                addReactionRole('!addrole:newworld', reaction, user);
            } else if (reaction.emoji.name === 'aoe') {
                addReactionRole('!addrole:aoe', reaction, user);
            } else if (reaction.emoji.name === 'ow') {
                addReactionRole('!addrole:ow', reaction, user);
            } else if (reaction.emoji.name === 'huntshowdown') {
                addReactionRole('!addrole:hunt', reaction, user);
            } else if (reaction.emoji.name === 'dota') {
                addReactionRole('!addrole:dota', reaction, user);
            }
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
        // Function for removing reaction roles //
        // -------------------------- //
    function removingReactionRole(roleToRemove, reaction, user) {
            // Filter the rolename of the whole !rmrole request out
        const roleName = roleToRemove.split(':', 2)[1].toLowerCase();
        let role = null;
            // Cycle through the predefined role array
        for (const [key, value] of Object.entries(arrayOfRoles)) {
              // When removing a role we can also use our predefined role array. But this time we need to split the vlaue field and check for accordance.
            const arrayKeySplit = value.split(':', 2);
              // If the given role name matches an entry of the predefined role array it will further execute
            if (roleName === arrayKeySplit[1].toLowerCase()) {
                // Get role id from the discord guild
                role = reaction.message.guild.roles.cache.find(role => role.name === key);
            }
        }
        if (role === null) {
            console.log(reaction.message.guild.members.cache.get(user.id).displayName + ' tried to remove the role >' + roleName + '< but failed somehow!');
            return;
        } else {
            const reactionMember = reaction.message.guild.members.cache.get(user.id);
            reactionMember.roles.remove(role);
            console.log(user.username + ' removed himself the role: ' + role.name);
        }
    }

    // When we receive a reaction we check if the reaction is partial or not
    // How-To Channel
    const channelHow = reaction.message.guild.channels.cache.find(channel => channel.name === '❔how-to');
    if (reaction.message.channelId === channelHow.id) {
        // console.log('Listening on (remove) reactions in the correct channel');
        try {
            await reaction.fetch();
            if (reaction.emoji.name === 'apex') {
                removingReactionRole('!rmrole:apex', reaction, user);
            } else if (reaction.emoji.name === 'justchatting') {
                removingReactionRole('!rmrole:jc', reaction, user);
            } else if (reaction.emoji.name === 'csgo') {
                removingReactionRole('!rmrole:cs', reaction, user);
            } else if (reaction.emoji.name === 'valorant') {
                removingReactionRole('!rmrole:valorant', reaction, user);
            } else if (reaction.emoji.name === 'amongus') {
                removingReactionRole('!rmrole:amongus', reaction, user);
            } else if (reaction.emoji.name === 'minecraft') {
                removingReactionRole('!rmrole:minecraft', reaction, user);
            } else if (reaction.emoji.name === 'rocketleague') {
                removingReactionRole('!rmrole:rl', reaction, user);
            } else if (reaction.emoji.name === 'valheim') {
                removingReactionRole('!rmrole:valheim', reaction, user);
            } else if (reaction.emoji.name === 'newWorld') {
                removingReactionRole('!rmrole:newworld', reaction, user);
            } else if (reaction.emoji.name === 'aoe') {
                removingReactionRole('!rmrole:aoe', reaction, user);
            } else if (reaction.emoji.name === 'ow') {
                removingReactionRole('!rmrole:ow', reaction, user);
            } else if (reaction.emoji.name === 'huntshowdown') {
                removingReactionRole('!rmrole:hunt', reaction, user);
            } else if (reaction.emoji.name === 'dota') {
                removingReactionRole('!rmrole:dota', reaction, user);
            }
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
});

// Greet all new members
client.on('guildMemberAdd', (member) => {
    var guild = member.guild;
    //var memberTag = member.user.tag;
    var name = member.user.username;
    var id = member.user.id;

    if (guild.systemChannel) {
        /* guild.systemChannel.send({ embeds: [new Discord.RichEmbed(] }) // Creating instance of Discord.RichEmbed
        .setTitle("A new user joined") // Calling method setTitle on constructor.
        .setDescription(memberTag + " has joined the guild") // Setting embed description
        .setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
        .addFields("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
        .setTimestamp() // Sets a timestamp at the end of the embed
        ); */
        console.log('The user: ' + name + ' joined the Server');

        const channelHow = guild.channels.cache.find(channel => channel.name === '❔how-to');
        //var adminLink = guild.roles.cache.find(role => role.name === 'Admin');
        const welcomeMessageGer = 'Hallo <@' + id + '>, schön dich kennenzulernen! \nDie Verwendung einer Rolle auf diesem Server ist **unumgänglich**. Du kannst dir selbst eine Rolle unter <#' + channelHow + '> aussuchen, indem du auf das jeweilige Emoji reagierst. \n**Nur mit der Rolle** sind die jeweiligen **Channels sichtbar**. \nBitte lies dir unsere Regeln durch und für weitere Informationen die **gepinnten Nachrichten** in jedem unserer Textchannels :) \n';
        //const welcomeMessageEng = 'Hello <@' + id + '>, nice to meet you! \nUsing a role on this server is **inevitable**, you can add it yourself in <#' + channelHow + '> by reacting on the specific emoji. Only with the role the specific Channels are visible. \nPlease read our rules and for additional information checkout the **pinned messages** in each of our text channels. :) \n';

        guild.systemChannel.send({ content: welcomeMessageGer + "\n" }).catch((e) => { console.log(e); });
        // guild.systemChannel.send({ content: welcomeMessageGer + "\n" + welcomeMessageEng).catch((e) => { console.log(e); } });
    }
});

// Notify about leaving members
client.on('guildMemberRemove', (member) => {
    var userID = member.id;
    var userName = member.user.username;
    // var userTag = message.member.user.tag; currently not working
    const adminChat = member.guild.channels.cache.find(channel => channel.name === 'admin-chat');
    console.log('The user: ' + userName + ' with ID: ' + userID + ' left the Server');
    adminChat.send({ content: 'The user: ' + userName + ' with ID: ' + userID + ' left the Server' });
});

// Log our bot in by using the token from https://discordapp.com/developers/applications/me
client.login(loginCreds.token);