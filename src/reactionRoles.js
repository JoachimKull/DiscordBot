'use strict';

const { Events } = require('discord.js');
const { roles } = require('../config/roles');

function registerReactionRoles(client) {
    client.on('messageCreate', message => {
        const lowerCaseMessage = message.cleanContent.toLowerCase();
        if (lowerCaseMessage === '!react') {
            if (message.member.permissions.has('ADMINISTRATOR')) {
                console.log('The force is strong in this one!');
                const emojis = Object.values(roles)
                    .map(r => message.guild.emojis.cache.find(emoji => emoji.name === r.emoji))
                    .filter(Boolean);
                try {
                    message.channel.send({ content: '**Um dir eine spiel spezifische Rolle hinzuzufügen, reagiere einfach mit dem entsprechenden Emoji.** \n**For adding yourself a game specific role, simply react with the corresponding emoji.** \n' }).then(initMessage => {
                        for (const emoji of emojis) {
                            initMessage.react(emoji);
                        }
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
        const channelHow = reaction.message.guild.channels.cache.find(channel => channel.name === '❔how-to');
        if (reaction.message.channel.id !== channelHow.id) return;
        try {
            await reaction.fetch();
            const code = Object.entries(roles).find(([, value]) => value.emoji === reaction.emoji.name)?.[0];
            if (!code) return;
            const roleName = roles[code].name;
            const role = reaction.message.guild.roles.cache.find(r => r.name === roleName);
            if (!role) return;
            const reactionMember = reaction.message.guild.members.cache.get(user.id);
            if (reactionMember.roles.cache.has(role.id)) {
                await reactionMember.roles.remove(role);
                console.log(user.username + ' removed the role: ' + role.name);
            } else if (user.id !== '561275886192820224') {
                await reactionMember.roles.add(role);
                console.log(user.username + ' added himself the role: ' + role.name);
            } else {
                console.log(user.username + ' is excluded from getting the role: ' + role.name);
            }
            await reaction.users.remove(user.id);
        } catch (error) {
            console.error('Something went wrong when processing the reaction: ', error);
        }
    });
}

module.exports = { registerReactionRoles };

