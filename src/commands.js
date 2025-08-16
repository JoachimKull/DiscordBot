'use strict';

const { roles } = require('../config/roles');

function registerCommands(client) {
    client.on('messageCreate', async message => {
        const lowerCaseMessage = message.cleanContent.toLowerCase();

        let channelBotCommands;
        try {
            channelBotCommands = message.member.guild.channels.cache.find(channel => channel.name === '🤖bot-commands');
        } catch (error) {
            console.log('Error getting the bot-commands Channel: ' + error);
            console.log('Setting the channel ID manually');
            channelBotCommands = '689909990160334910';
        }

        if (lowerCaseMessage.startsWith('!')) {
            if (message.channel.id == channelBotCommands || message.author == '561275886192820224' || message.member.permissions.has("ADMINISTRATOR")) {
                console.log('This one has massive powers!');
            } else {
                message.reply({ content: 'please use our <#' + channelBotCommands + '> channel to keep this one tidy.' });
                return;
            }
        }

        if (lowerCaseMessage.startsWith('/')) {
            if (message.channel.id == channelBotCommands || message.author == '561275886192820224' || message.member.permissions.has("ADMINISTRATOR")) {
                console.log('This one has massive powers!');
            } else {
                message.reply({ content: 'please use our <#' + channelBotCommands + '> channel to keep this one tidy.' });
                return;
            }
        }

        if (lowerCaseMessage === '!newbies') {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                console.log('Admin looked for newbs!');

                const list = client.guilds.cache.get('554337259315265538');

                const date = new Date();
                const today = date.getTime();
                const lastTwoWeeks = (today - 1209600000);
                list.members.cache.forEach(member => {
                    try {
                        if (member.joinedAt.getTime() >= lastTwoWeeks) {
                            console.log(member.user.username);
                            message.channel.send({ content: 'New user/s: ' + member.user.username }).catch((e) => { console.log(e); });
                        }
                    } catch (error) {
                        console.log('getTime failed - in !newbies command!');
                    }
                });
            } else {
                message.reply({ content: 'This command is for admins only - sorry :*' });
                return;
            }
        }

        if (lowerCaseMessage === '!ping') {
            message.channel.send({ content: 'Pong!' }).catch((e) => { console.log(e); });
            console.log('Ping from: ' + message.member.user.username);
        }

        if (lowerCaseMessage === '!cmds' || lowerCaseMessage === '!help') {
            const channelLink = message.member.guild.channels.cache.find(channel => channel.name === '🤖bot-commands');
            message.reply({ content: 'Hey you! \nI only understand certain commands. Here is a list of them: \n-> "**!roles**" - shows a list of all available roles \n-> "**!sounds**" - shows a list of all soundsnippets \nGo ahead and try it yourself under the channel <#' + channelLink + '>"' }).catch((e) => { console.log(e); });
        }

        if (lowerCaseMessage === '!roles') {
            const roleLines = Object.entries(roles)
                .map(([key, value]) => `**!addRole:${key}** | ${value.name}`)
                .join(' \n ');
            message.channel.send({ content: 'These are the available roles: \n ' + roleLines + ' \n\n*Of course you can remove a role yourself using the following pattern:* "**!rmRole:apex**"' }).catch((e) => { console.log(e); });
        }

        function addingRole(roleToAdd) {
            const code = roleToAdd.split(':', 2)[1];
            const roleInfo = roles[code];
            if (!roleInfo) return;
            const role = message.guild.roles.cache.find(r => r.name === roleInfo.name);
            if (!role) {
                console.log(message.member.user.username + ' tried to get a non existing role (' + code + ')');
                message.reply({ content: 'Hm...it seems that I know this role but this server does not...' }).catch((e) => { console.log(e); });
                return;
            }
            const roleId = role.toString().replace(/\D/g, '');
            if (message.member.roles.cache.has(roleId)) {
                console.log(message.member.user.username + ' already has the role: ' + role.name);
                message.reply({ content: 'NANI?!... you already have the role: ' + role.name }).catch((e) => { console.log(e); });
            } else {
                message.member.roles.add(role);
                console.log(message.member.user.username + ' added himself the role: ' + role.name);
                message.reply({ content: 'Have fun with your new role! :)' }).catch((e) => { console.log(e); });
            }
        }

        if (lowerCaseMessage.startsWith('!addrole:')) {
            try {
                addingRole(lowerCaseMessage);
            } catch (error) {
                console.log('Unknown input for adding role: ' + message);
            }
        }

        function removingRole(roleToRemove) {
            const code = roleToRemove.split(':', 2)[1];
            const roleInfo = roles[code];
            if (!roleInfo) {
                message.reply({ content: 'This server doesn\'t know this role...' }).catch((e) => { console.log(e); });
                return;
            }
            const role = message.guild.roles.cache.find(r => r.name === roleInfo.name);
            if (!role) {
                message.reply({ content: 'This server doesn\'t know this role...' }).catch((e) => { console.log(e); });
                return;
            }
            const roleId = role.toString().replace(/\D/g, '');
            if (message.member.roles.cache.has(roleId)) {
                message.member.roles.remove(role);
                console.log(message.member.user.username + ' removed himself the role: ' + role.name);
                message.reply({ content: 'I removed the role ' + role.name + ' from you.\n*...sad bot noises...*' }).catch((e) => { console.log(e); });
            } else {
                console.log(message.member.user.username + ' tried to remove a role he doesn\'t own: ' + role.name);
                message.reply({ content: 'You can\'t remove a role you don\'t own!' }).catch((e) => { console.log(e); });
            }
        }

        if (lowerCaseMessage.startsWith('!rmrole:')) {
            try {
                removingRole(lowerCaseMessage);
            } catch (error) {
                console.log('Unknown input for removing role: ' + message);
            }
        }

        const knownCommandPattern = /^!(?:newbies|ping|cmds|help|roles|addrole:|rmrole:)/;
        if (lowerCaseMessage.startsWith('!') && !knownCommandPattern.test(lowerCaseMessage)) {
            message.reply({ content: 'Unknown command. Try **!help** for a list of commands.' }).catch((e) => { console.log(e); });
        }
    });

    client.on('guildMemberAdd', (member) => {
        const guild = member.guild;
        const name = member.user.username;
        const id = member.user.id;

        if (guild.systemChannel) {
            console.log('The user: ' + name + ' joined the Server');

            const channelHow = guild.channels.cache.find(channel => channel.name === '❔how-to');
            const welcomeMessageGer = 'Hallo <@' + id + '>, schön dich kennenzulernen! \nDie Verwendung einer Rolle auf diesem Server ist **unumgänglich**. Du kannst dir selbst eine Rolle unter <#' + channelHow + '> aussuchen, indem du auf das jeweilige Emoji reagierst. \n**Nur mit der Rolle** sind die jeweiligen **Channels sichtbar**. \nBitte lies dir unsere Regeln durch und für weitere Informationen die **gepinnten Nachrichten** in jedem unserer Textchannels :) \n';

            guild.systemChannel.send({ content: welcomeMessageGer + '\n' }).catch((e) => { console.log(e); });
        }
    });

    client.on('guildMemberRemove', (member) => {
        const userID = member.id;
        const userName = member.user.username;
        const adminChat = member.guild.channels.cache.find(channel => channel.name === 'admin-chat');
        console.log('The user: ' + userName + ' with ID: ' + userID + ' left the Server');
        adminChat.send({ content: 'The user: ' + userName + ' with ID: ' + userID + ' left the Server' });
    });
}

module.exports = { registerCommands };

