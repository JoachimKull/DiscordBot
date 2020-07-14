// Commands for MP3 Snippets //
// ------------------------- //

function playSnippet(snippetName) {
    // Voice only works in guilds
    if (!message.guild) return;

    message.member.voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('./SoundSnippets/' + snippetName + '.mp3', { volume: 0.5 });
        dispatcher.on("end", end => { message.member.voiceChannel.leave(); })
    }).catch(err => console.log(err));
}

if (message.content.toLowerCase().startsWith("/")) {
    try {
        const soundsFolder = './SoundSnippets/';
        const fs = require('fs');

        fs.readdir(soundsFolder, (err, files) => {
            files.forEach(file => {
                console.log(file);
                if (file.localeCompare(message.content.toLowerCase)) {
                    playSnippet(message.content.toLowerCase());
                }
            });
        });
    } catch (error) {
        console.log("Unknown input for sound snippets: " + message);
    }
}