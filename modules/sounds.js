/**
 * Prints a list of all available sound snippets
 * @param {*} message is used to get all the needed information e.g. channel id in which it was sent in
 * @param {*} fs represents the filesystem
 * @param {*} soundsFolder path to the folder with the snippets
 */
exports.listSoundSnippets = function listSoundSnippets(message, fs, soundsFolder) {
    message.reply('Try playing a snippet by typing "**/**_filename_" \nHere are the available sounds:\n').catch((e) => { console.log(e); });
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

/**
 * Plays the selected snippet in a voice channel
 * @param {*} message is used to get all the needed information e.g. channel id in which it was sent in
 * @param {*} fs represents the filesystem
 * @param {*} soundsFolder path to the folder with the snippets
 * @returns a message if the user is not in a voice channel
 */
exports.playSnippet = function playSnippet(message, fs, soundsFolder) {
    // Voice only works in guilds
    if (!message.guild) {
        return;
    }

    try {
        // Remove the / from the message and add the .mp3 ending
        var concatMsg = lowerCaseMessage.concat('.mp3').slice(1);
        var pathToFile = soundsFolder.concat(concatMsg);
        var vc = message.member.voice.channel;

        // Iterate over snippets
        fs.readdir(soundsFolder, (err, files) => {
            files.forEach(file => {
                if (file === concatMsg) {
                    // Only try to join the sender's voice channel if they are in one themselves
                    if (vc) {
                        vc.join().then(connection => {
                            const dispatcher = connection.play(pathToFile, { volume: 0.5, });
                            dispatcher.on('finish', () => {
                                vc.leave();
                                // console.log('Finished playing: ' + concatMsg);
                            });
                        });
                    } else {
                        message.reply('You need to join a voice channel first!');
                    }
                }
            });
        });
    } catch (error) {
        console.log('Unknown input for sound snippet: ' + message.content);
    }
}