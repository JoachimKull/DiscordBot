/**
 * Prepared message for role reactions
 * Check for privileges - only admins should be able to trigger this message
 * @param {*} message is used to get all the needed information e.g. channel id in which it was sent in
 */
function setupReactionMessage(message) {
    const emojiJC = message.guild.emojis.cache.find(emoji => emoji.name === 'justchatting');
    const emojiApex = message.guild.emojis.cache.find(emoji => emoji.name === 'apex');
    const emojiCS = message.guild.emojis.cache.find(emoji => emoji.name === 'csgo');
    const emojiValorant = message.guild.emojis.cache.find(emoji => emoji.name === 'valorant');
    const emojiAmongUs = message.guild.emojis.cache.find(emoji => emoji.name === 'amongus');
    const emojiMinecraft = message.guild.emojis.cache.find(emoji => emoji.name === 'minecraft');
    const emojiRocketLeague = message.guild.emojis.cache.find(emoji => emoji.name === 'rocketleague');
    const emojiValheim = message.guild.emojis.cache.find(emoji => emoji.name === 'valheim');
    const emojiNewWorld = message.guild.emojis.cache.find(emoji => emoji.name === 'newWorld');

    message.channel.send('**Um dir eine spiel spezifische Rolle hinzuzufügen, reagiere einfach mit dem entsprechenden Emoji.** \n**For adding yourself a game specific role, simply react with the corresponding emoji.** \n').then(initMessage => {
        // console.log(id);
        //let id = initMessage.id;
        initMessage.react(emojiJC);
        initMessage.react(emojiApex);
        initMessage.react(emojiCS);
        initMessage.react(emojiValorant);
        initMessage.react(emojiAmongUs);
        initMessage.react(emojiMinecraft);
        initMessage.react(emojiRocketLeague);
        initMessage.react(emojiValheim);
        initMessage.react(emojiNewWorld);
    });
}
module.exports = setupReactionMessage;