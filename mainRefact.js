/**
 * A bot based on the following repo from 'y15':
 * https://gist.github.com/y21/a599ef74c8746341dbcbd32093a69eb8
 */

// Load your credentials stored in a separate file
// var loginCreds = require('../Credentials/credentials.json');
const loginCreds = require('../Credentials/DF-TestBot_credentials.json');

// Import the discord.js module
const { Client, Intents } = require('discord.js');

// Import our modules
const getGuildChannelIDfromChannelName = require('./modules/channelID');
const isPrivileged = require('./modules/checkPrivileges');
const { listSoundSnippets, playSnippet } = require('./modules/sounds');
const { welcomeMessage, alertGuildMemberLeave } = require('./modules/guildMemberLeave');
const setupReactionMessage = require('./modules/reactions');

// Defines
const soundsFolder = './SoundSnippets/';
const fs = require('fs');

// Get all intents and create an instance of a Discord client
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }, { ws: { intents: Intents.ALL } });

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    var date = new Date();
    console.log('LegendBot is ready! - ' + date.toLocaleString());

    // Set a game activity for the bot
    client.user.setActivity("LegendBot | ?help");
});

// Create an event listener for messages
client.on('message', userMessage => {

    var lowercasemsg = userMessage.content.toLowerCase();

    var channelBotCommands = getGuildChannelIDfromChannelName(userMessage, '🤖bot-commands');

    // If the origin of the message is the bot-commands channel or the message author is not our bot or the message author is an admin - do nothing
    if (lowercasemsg.startsWith('!') || lowercasemsg.startsWith('?') || lowercasemsg.startsWith('/')) {
        if (!isPrivileged(userMessage, channelBotCommands)) {
            return;
        }
    }

    // If the message is "ping"
    if (lowercasemsg === '!ping') {
        // Send "pong" to the same channel
        userMessage.channel.send('Pong!').catch((e) => { console.log(e); });
        console.log('Ping from: ' + userMessage.member.user.username);
    }

    if (lowercasemsg === '?cmds' || lowercasemsg === '?help') {
        // Print all existing commands
        userMessage.reply('Hey you! \nI only understand certain commands. Here is a list of them: \n-> "**?sounds**" - shows a list of all sound snippets \nGo ahead and try it yourself under the channel <#' + channelBotCommands + '>').catch((e) => { console.log(e); });
    }

    // Display all available sound snippets
    if (lowercasemsg === '?sounds') {
        listSoundSnippets(userMessage, fs, soundsFolder);
    }

    // Play the sound snippet if it has found one
    if (userMessage.content.startsWith('/')) {
        playSnippet(lowercasemsg, fs, soundsFolder);
    }

    // Prepared message for role reactions
    // Check for privileges - only admins should be able to trigger this message
    if (lowercasemsg === '!reactionsinit') {
        var channelHowTo = getGuildChannelIDfromChannelName(userMessage, '❔how-to');
        if (!isPrivileged(userMessage, channelHowTo)) {
            console.log("Unpriv users tried react init");
            userMessage.reply('This command is not meant to be used by you - Kleiner Schlingel!');
        } else {
            setupReactionMessage(userMessage);
        }
    }

    // TODO: Async everything(?)
    client.on('messageReactionAdd', async(reaction, user) => {
        // TODO: Check for the How-To Channel
        const channelHow = reaction.message.guild.channels.cache.find(channel => channel.name === '❔how-to');

        // Function for getting reaction roles //
        // -------------------------- //
        function addReactionRole(roleToAdd) {
            var role = null;
            // If the given role name matches an entry of the predefined role array it will further execute
            //TODO: Get the roles array from the guild
            // var role = reaction.message.guild.roles.cache.find(role => role.name === key);
            // var reactionMember = reaction.message.member.guild.members.cache.find((member) => member.id === user.id);
            // reactionMember.roles.add(role);
            // console.log(user.username + ' added himself the role: ' + role.name);
        }

        if (reaction.message.channel.id === channelHow.id) {
            // console.log('Listening on (add) reactions in the correct channel');
            try {
                await reaction.fetch();
                //TODO: hasRole Func (if !hasRole) - Maybe the emotes need a 1:1 mapping of the real role names
                if (reaction.emoji.name === 'apex') {
                    addReactionRole('!addrole:apex');
                } else if (reaction.emoji.name === 'justchatting') {
                    addReactionRole('!addrole:jc');
                } else if (reaction.emoji.name === 'csgo') {
                    addReactionRole('!addrole:cs');
                } else if (reaction.emoji.name === 'valorant') {
                    addReactionRole('!addrole:valorant');
                } else if (reaction.emoji.name === 'amongus') {
                    addReactionRole('!addrole:amongus');
                } else if (reaction.emoji.name === 'minecraft') {
                    addReactionRole('!addrole:minecraft');
                } else if (reaction.emoji.name === 'rocketleague') {
                    addReactionRole('!addrole:rl');
                } else if (reaction.emoji.name === 'valheim') {
                    addReactionRole('!addrole:valheim');
                } else if (reaction.emoji.name === 'newWorld') {
                    addReactionRole('!addrole:newworld');
                }
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }
        }
    });
});

// Greet all new members
client.on('guildMemberAdd', (member) => {
    welcomeMessage(member);
});

// Notify about leaving members
client.on('guildMemberRemove', (member) => {
    const notificationChannel = 'admin-chat';
    alertGuildMemberLeave(member, notificationChannel);
});

// Log our bot in by using the token from https://discordapp.com/developers/applications/me
client.login(loginCreds.token);