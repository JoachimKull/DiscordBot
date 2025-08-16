'use strict';

/**
 * A bot based on the following repo from 'y15':
 * https://gist.github.com/y21/a599ef74c8746341dbcbd32093a69eb8
 */

const loginCreds = require('../Credentials/credentials.json');

const { Client, GatewayIntentBits, Partials } = require('discord.js');

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

client.on('ready', () => {
    const date = new Date();
    console.log('LegendBot is ready! - ' + date.toLocaleString());
    client.user.setActivity('LegendBot | !help');
});

const { registerCommands } = require('./src/commands');
const { registerReactionRoles } = require('./src/reactionRoles');
const { registerSounds } = require('./src/sounds');

registerCommands(client);
registerReactionRoles(client);
registerSounds(client);

client.login(loginCreds.token);

