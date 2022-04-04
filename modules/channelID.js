/**
 * Returns the ID of a given channel name
 * @param {*} message is used to get all the needed information e.g. channel id in which it was sent in
 * @param {*} channelName
 * @returns the id of the given channel name based on the guild of the message origin
 */
function getGuildChannelIDfromChannelName(message, channelName) {
    return message.member.guild.channels.cache.find(channel => channel.name === channelName);
}

module.exports = getGuildChannelIDfromChannelName;