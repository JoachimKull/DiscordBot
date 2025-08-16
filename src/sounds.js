'use strict';

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const fs = require('fs');
const soundsFolder = './SoundSnippets/';

function registerSounds(client) {
    client.on('messageCreate', async message => {
        const lowerCaseMessage = message.cleanContent.toLowerCase();

        if (message.cleanContent.startsWith('/')) {
            if (!message.guild) return;
            try {
                const vc = message.member.voice.channel;
                if (!vc) {
                    message.reply('You need to be in a voice channel to use this command.');
                    return;
                }

                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channelId,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                });

                connection.on('error', error => {
                    console.error(error);
                });

                const concatMsg = lowerCaseMessage.concat('.mp3').slice(1);
                const pathToFile = soundsFolder.concat(concatMsg);

                const files = await fs.promises.readdir(soundsFolder);
                for await (const file of files) {
                    if (file === concatMsg) {
                        connection.on('ready', () => {
                            console.log(`Joined ${message.member.voice.channel.name} voice channel!`);

                            const player = createAudioPlayer();
                            const resource = createAudioResource(pathToFile);
                            player.play(resource);
                            connection.subscribe(player);

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

        if (lowerCaseMessage === '!sounds') {
            const sounds = [];
            fs.readdir(soundsFolder, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }

                files.forEach(file => {
                    sounds.push('- ' + file.split('.')[0]);
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
    });
}

module.exports = { registerSounds };

