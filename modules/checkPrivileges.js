/**
 * If the origin of the message is the bot-commands channel or the message author is not our bot or the message author is an admin - do nothing
 * @param {*} message is used to get all the needed information e.g. channel id in which it was sent in
 * @param {*} channelID the channel id for which we want to allow users to send bot commands in
 * @returns true if everything the user either is 1. in the correct channel / 2. admin / 3. the bot itself - false in any other case
 */
function isPrivileged(message, channelID) {
    if (message.channel.id == channelID || message.author == '561275886192820224' || message.member.hasPermission("ADMINISTRATOR")) {
        console.log('This one has massive powers!');
        return true;
    } else { // Remind the user to use the correct channel
        message.reply('please use our <#' + channelID + '> channel to keep this one tidy.');
        return false;
    }
}

module.exports = isPrivileged;