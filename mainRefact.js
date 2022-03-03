/**
 * A bot based on the following repo from 'y15':
 * https://gist.github.com/y21/a599ef74c8746341dbcbd32093a69eb8
 */

const getGuildChannelIDfromChannelName = require('./modules/channelID.js');
const isPrivileged = require('./modules/checkPrivileges.js');

// Load your credentials stored in a separate file
// var loginCreds = require('../Credentials/credentials.json');
const loginCreds = require('../Credentials/DF-TestBot_credentials.json');

// Import the discord.js module
const { Client, Intents } = require('discord.js');

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
    client.user.setActivity("LegendBot | !help");
});

// Create an event listener for messages
client.on('message', userMessage => {

    var lowercasemsg = userMessage.content.toLowerCase();

    var channelBotCommands = getGuildChannelIDfromChannelName(userMessage, '🤖bot-commands');

    // If the origin of the message is the bot-commands channel or the message author is not our bot or the message author is an admin - do nothing
    if (lowercasemsg.startsWith('!')) {
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

    if (lowercasemsg === '!cmds' || lowercasemsg === '!help') {
        // Print all existing commands
        userMessage.reply('Hey you! \nI only understand certain commands. Here is a list of them: \n-> "**!roles**" - shows a list of all available roles \n-> "**!sounds**" - shows a list of all sound snippets \nGo ahead and try it yourself under the channel <#' + channelBotCommands + '>').catch((e) => { console.log(e); });
    }
});

// Log our bot in by using the token from https://discordapp.com/developers/applications/me
client.login(loginCreds.token);